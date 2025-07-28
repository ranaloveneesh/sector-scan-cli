import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface LLMNode {
  id: string;
  name: string;
  position: [number, number, number];
  selected: boolean;
}

interface SynapticWebProps {
  models: string[];
  selectedModels: string[];
  onSelectionChange: (selected: string[]) => void;
}

// Individual node component
const LLMNodeComponent: React.FC<{
  node: LLMNode;
  onClick: () => void;
}> = ({ node, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime + node.position[0]) * 0.1;
      
      // Pulsing effect for selected nodes
      if (node.selected) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
      }
    }
  });

  return (
    <group
      position={node.position}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main node sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhongMaterial
          color={node.selected ? '#00ffff' : hovered ? '#888888' : '#444444'}
          emissive={node.selected ? '#004444' : '#000000'}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color={node.selected ? '#00ffff' : '#444444'}
          transparent
          opacity={node.selected ? 0.2 : 0.1}
        />
      </mesh>
      
      {/* Text label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.2}
        color={node.selected ? '#00ffff' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
      >
        {node.name}
      </Text>
    </group>
  );
};

// Simplified connection lines using individual Line components
const ConnectionLine: React.FC<{ 
  start: [number, number, number]; 
  end: [number, number, number]; 
  active: boolean;
}> = ({ start, end, active }) => {
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const mid = startVec.clone().lerp(endVec, 0.5);
    mid.y += 0.5; // Arc the connection upward
    
    // Create curve points
    const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
    return curve.getPoints(20);
  }, [start, end]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <mesh>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial
        attach="material"
        color={active ? '#00ffff' : '#333333'}
        transparent
        opacity={active ? 0.8 : 0.3}
      />
    </mesh>
  );
};

// Neural particles background
const NeuralParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, particleCount } = useMemo(() => {
    const count = 50;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return { positions: pos, particleCount: count };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation={false}
      />
    </points>
  );
};

export const SynapticWeb: React.FC<SynapticWebProps> = ({
  models,
  selectedModels,
  onSelectionChange,
}) => {
  // Generate node positions in a neural network layout
  const nodes: LLMNode[] = useMemo(() => {
    const positions: [number, number, number][] = [
      [-2, 1, 0],    // ChatGPT
      [2, 1, 0],     // Claude  
      [0, 2, 0],     // Gemini
      [-3, -1, 0],   // Grok
      [3, -1, 0],    // Mistral
      [0, -2, 0],    // Llama
      [-1, 0, 0],    // Qwen
      [1, 0, 0],     // DeepSeek
      [0, 0, -1],    // Phi
    ];

    return models.map((model, index) => ({
      id: model,
      name: model,
      position: positions[index] || [0, 0, 0],
      selected: selectedModels.includes(model),
    }));
  }, [models, selectedModels]);

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const conns: Array<{
      start: [number, number, number];
      end: [number, number, number];
      active: boolean;
    }> = [];
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = new THREE.Vector3(...nodes[i].position)
          .distanceTo(new THREE.Vector3(...nodes[j].position));
        if (distance < 3) {
          conns.push({
            start: nodes[i].position,
            end: nodes[j].position,
            active: nodes[i].selected || nodes[j].selected,
          });
        }
      }
    }
    return conns;
  }, [nodes]);

  const handleNodeClick = (modelName: string) => {
    const newSelection = selectedModels.includes(modelName)
      ? selectedModels.filter(m => m !== modelName)
      : [...selectedModels, modelName];
    onSelectionChange(newSelection);
  };

  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ffffff" />
        
        {/* Neural particles background */}
        <NeuralParticles />
        
        {/* Connection lines */}
        {connections.map((connection, index) => (
          <ConnectionLine
            key={index}
            start={connection.start}
            end={connection.end}
            active={connection.active}
          />
        ))}
        
        {/* LLM nodes */}
        {nodes.map((node) => (
          <LLMNodeComponent
            key={node.id}
            node={node}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </Canvas>
      
      {/* Selection counter */}
      <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
        {selectedModels.length} selected
      </div>
    </div>
  );
};
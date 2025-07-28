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

interface Connection {
  from: [number, number, number];
  to: [number, number, number];
  active: boolean;
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
  connections: Connection[];
}> = ({ node, onClick, connections }) => {
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
        font="/fonts/inter-medium.woff"
      >
        {node.name}
      </Text>
    </group>
  );
};

// Connection lines component
const ConnectionLines: React.FC<{ connections: Connection[] }> = ({ connections }) => {
  const lineRefs = useRef<THREE.BufferGeometry[]>([]);

  useFrame((state) => {
    lineRefs.current.forEach((geometry, index) => {
      if (geometry && connections[index]) {
        const connection = connections[index];
        const points = [];
        
        // Create a curved path between nodes
        const start = new THREE.Vector3(...connection.from);
        const end = new THREE.Vector3(...connection.to);
        const mid = start.clone().lerp(end, 0.5);
        mid.y += 0.5; // Arc the connection upward
        
        // Create smooth curve
        for (let i = 0; i <= 20; i++) {
          const t = i / 20;
          const point = new THREE.Vector3();
          point.lerpVectors(start, mid, t).lerp(end, t);
          points.push(point);
        }
        
        geometry.setFromPoints(points);
      }
    });
  });

  return (
    <>
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry ref={(ref) => ref && (lineRefs.current[index] = ref)} />
          <lineBasicMaterial
            color={connection.active ? '#00ffff' : '#333333'}
            transparent
            opacity={connection.active ? 0.8 : 0.3}
            linewidth={connection.active ? 3 : 1}
          />
        </line>
      ))}
    </>
  );
};

// Neural particles effect
const NeuralParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
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

  // Generate connections between nodes
  const connections: Connection[] = useMemo(() => {
    const conns: Connection[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Create connections between nearby nodes
        const distance = new THREE.Vector3(...nodes[i].position)
          .distanceTo(new THREE.Vector3(...nodes[j].position));
        if (distance < 3) {
          conns.push({
            from: nodes[i].position,
            to: nodes[j].position,
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
        <ConnectionLines connections={connections} />
        
        {/* LLM nodes */}
        {nodes.map((node) => (
          <LLMNodeComponent
            key={node.id}
            node={node}
            onClick={() => handleNodeClick(node.id)}
            connections={connections}
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
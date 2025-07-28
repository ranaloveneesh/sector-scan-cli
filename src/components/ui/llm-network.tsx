import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LLMNetworkProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    options?: string[];
    ui: {
      logo_position: string;
      animation_style: string;
      animation_text: string;
      next_button_color: string;
      selector_style: string;
      label?: string;
    };
    validation?: {
      required: boolean;
      error_message: string;
    };
  };
  onSubmit: (selectedOptions: string[]) => void;
}

interface NodePosition {
  x: number;
  y: number;
  id: string;
}

interface Connection {
  from: string;
  to: string;
  pathD: string;
}

export const LLMNetwork: React.FC<LLMNetworkProps> = ({ data, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [animationText, setAnimationText] = useState('');
  const [showError, setShowError] = useState(false);
  const [nodePositions, setNodePositions] = useState<NodePosition[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [sparkingPath, setSparkingPath] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Terminal animation effect
  useEffect(() => {
    const text = data.ui.animation_text;
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setAnimationText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [data.ui.animation_text]);

  // Generate random positions and connections
  useEffect(() => {
    if (!data.options || data.options.length === 0) return;

    const containerWidth = 800;
    const containerHeight = 400;
    const margin = 80;

    // Generate random positions for each node
    const positions: NodePosition[] = data.options.map((option, index) => {
      // Use a combination of random and circular distribution to avoid clustering
      const angle = (index / data.options!.length) * 2 * Math.PI + Math.random() * 0.5;
      const radius = 120 + Math.random() * 100;
      
      const x = Math.max(margin, Math.min(containerWidth - margin, 
        containerWidth / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 60
      ));
      const y = Math.max(margin, Math.min(containerHeight - margin, 
        containerHeight / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 60
      ));

      return { x, y, id: option };
    });

    setNodePositions(positions);

    // Generate connections between nodes (create a web-like structure)
    const newConnections: Connection[] = [];
    
    positions.forEach((node, i) => {
      // Connect to 2-3 nearest nodes to create a network
      const distances = positions
        .map((other, j) => ({
          index: j,
          distance: Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2))
        }))
        .filter((_, j) => j !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, Math.floor(Math.random() * 2) + 2); // 2-3 connections

      distances.forEach(({ index }) => {
        const target = positions[index];
        // Check if connection already exists (to avoid duplicates)
        const connectionExists = newConnections.some(conn => 
          (conn.from === node.id && conn.to === target.id) ||
          (conn.from === target.id && conn.to === node.id)
        );

        if (!connectionExists) {
          const pathD = `M ${node.x} ${node.y} L ${target.x} ${target.y}`;
          newConnections.push({
            from: node.id,
            to: target.id,
            pathD
          });
        }
      });
    });

    setConnections(newConnections);
  }, [data.options]);

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
    setShowError(false);

    // Trigger spark animation on connected paths
    const connectedPaths = connections.filter(conn => 
      conn.from === option || conn.to === option
    );
    
    connectedPaths.forEach((conn, index) => {
      setTimeout(() => {
        setSparkingPath(conn.pathD);
        setTimeout(() => setSparkingPath(null), 800);
      }, index * 100);
    });
  };

  const handleSubmit = () => {
    if (data.validation?.required && selectedOptions.length === 0) {
      setShowError(true);
      return;
    }
    onSubmit(selectedOptions);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
      {/* Logo in top left */}
      <div className="absolute top-6 left-6 md:top-12 md:left-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-center" style={{
          width: 'clamp(4rem, 6vw, 6.25rem)',
          height: 'clamp(4rem, 6vw, 6.25rem)'
        }}>
          <img src="/lovable-uploads/a8d760f4-8e0c-410d-ae83-a3e6dd4b23e9.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* User label in top right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '150ms' }}>
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">{data.ui.label || 'large_language_models'}</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-32 lg:px-48 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="max-w-4xl w-full">
          {/* Question content */}
          <div className="text-center mb-8">
            <h1 className="text-responsive-title font-bold mb-1 text-white font-open-sauce">{data.title}</h1>
            <p className="text-responsive-subtitle text-slate-50 font-normal font-open-sauce">
              {data.subtitle}
            </p>
          </div>

          {/* Network visualization */}
          <div className="relative flex justify-center mb-8">
            <div className="relative w-full max-w-4xl h-96">
              {/* SVG for connections */}
              <svg 
                ref={svgRef}
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 400"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Connection lines */}
                {connections.map((connection, index) => (
                  <g key={`${connection.from}-${connection.to}`}>
                    <path
                      d={connection.pathD}
                      stroke="#6b7280"
                      strokeWidth="1"
                      fill="none"
                      className="opacity-40"
                    />
                    {/* Spark animation */}
                    {sparkingPath === connection.pathD && (
                      <path
                        d={connection.pathD}
                        stroke="#5CE1E6"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                        style={{
                          filter: 'drop-shadow(0 0 6px #5CE1E6)',
                          animation: 'pulse 0.8s ease-in-out'
                        }}
                      />
                    )}
                  </g>
                ))}
              </svg>

              {/* LLM nodes */}
              {nodePositions.map((position, index) => (
                <button
                  key={position.id}
                  onClick={() => handleOptionSelect(position.id)}
                  className={cn(
                    "absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg transition-all duration-300 font-medium",
                    "hover:scale-110 focus:outline-none cursor-pointer animate-fade-in",
                    selectedOptions.includes(position.id)
                      ? "bg-[#5CE1E6]/20 text-[#5CE1E6] border-2 border-[#5CE1E6] shadow-[0_0_20px_#5CE1E6]"
                      : "bg-[#1e293b]/80 text-white border border-gray-600 hover:bg-[#5CE1E6]/10 hover:text-[#5CE1E6]"
                  )}
                  style={{
                    left: `${(position.x / 800) * 100}%`,
                    top: `${(position.y / 400) * 100}%`,
                    animationDelay: `${300 + index * 100}ms`
                  }}
                >
                  {position.id}
                </button>
              ))}
            </div>
          </div>

          {/* Selected count indicator */}
          {selectedOptions.length > 0 && (
            <div className="text-center mb-4">
              <span className="text-[#5CE1E6] font-medium">
                {selectedOptions.length} selected: {selectedOptions.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">{animationText}</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit} 
          className="sci-fi-arrow font-mono text-[#5CE1E6] text-responsive-button neon-glow transition-all duration-300 relative hover:text-[#5CE1E6]/80 digital-glitch-click cursor-pointer hover:scale-105" 
          data-text="next"
        >
          next
        </button>
      </div>

      {/* Error message */}
      {showError && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <p className="text-red-400 font-medium animate-pulse">
            {data.validation?.error_message}
          </p>
        </div>
      )}
    </div>
  );
};
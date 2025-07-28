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
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 400 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        let newWidth, newHeight;
        if (isMobile) {
          newWidth = Math.min(400, rect.width);
          newHeight = Math.min(300, rect.height);
        } else if (isTablet) {
          newWidth = Math.min(600, rect.width);
          newHeight = Math.min(350, rect.height);
        } else {
          newWidth = Math.min(800, rect.width);
          newHeight = Math.min(400, rect.height);
        }
        
        setContainerDimensions({ width: newWidth, height: newHeight });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate random positions and connections
  useEffect(() => {
    if (!data.options || data.options.length === 0) return;

    const { width: containerWidth, height: containerHeight } = containerDimensions;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Responsive margins and spacing
    const margin = isMobile ? Math.max(40, containerWidth * 0.12) : Math.max(50, containerWidth * 0.1);
    const minDistance = isMobile ? 50 : isTablet ? 55 : 60; // Increased distance on mobile
    const randomOffsetScale = isMobile ? 0.4 : isTablet ? 0.7 : 1; // Reduced randomness on mobile

    // Generate better distributed positions using "ordered chaos"
    const positions: NodePosition[] = [];
    // More structured grid on mobile to prevent overlaps
    const gridCols = isMobile ? Math.max(2, Math.ceil(Math.sqrt(data.options.length * 0.8))) : Math.ceil(Math.sqrt(data.options.length * (isTablet ? 1.2 : 1.5)));
    const gridRows = Math.ceil(data.options.length / gridCols);
    
    data.options.forEach((option, index) => {
      // Start with a loose grid
      const col = index % gridCols;
      const row = Math.floor(index / gridCols);
      
      const baseX = margin + ((containerWidth - 2 * margin) / Math.max(1, gridCols - 1)) * col;
      const baseY = margin + ((containerHeight - 2 * margin) / Math.max(1, gridRows - 1)) * row;
      
      // Add controlled randomness for "ordered chaos"
      const randomOffsetX = (Math.random() - 0.5) * 80 * randomOffsetScale;
      const randomOffsetY = (Math.random() - 0.5) * 60 * randomOffsetScale;
      
      let x = baseX + randomOffsetX;
      let y = baseY + randomOffsetY;
      
      // Ensure minimum distance from other nodes and boundaries
      let attempts = 0;
      while (attempts < 50) {
        const tooClose = positions.some(pos => {
          const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
          return distance < minDistance;
        });
        
        if (!tooClose && x >= margin && x <= containerWidth - margin && 
            y >= margin && y <= containerHeight - margin) {
          break;
        }
        
        // Adjust position if too close or out of bounds
        x = baseX + (Math.random() - 0.5) * 100;
        y = baseY + (Math.random() - 0.5) * 80;
        attempts++;
      }
      
      positions.push({ x, y, id: option });
    });

    // Manual adjustments for specific nodes (disabled on mobile to prevent overlaps)
    if (!isMobile) {
      positions.forEach(pos => {
        if (pos.id === 'Qwen') {
          // Move Qwen down to Phi height level
          const phiNode = positions.find(p => p.id === 'Phi');
          if (phiNode) pos.y = phiNode.y;
        }
        if (pos.id === 'Llama') {
          // Move Llama slightly below Phi/Qwen/DeepSeek level
          const phiNode = positions.find(p => p.id === 'Phi');
          if (phiNode) pos.y = phiNode.y + 25; // 25px below the main level
        }
        if (pos.id === 'Mistral') {
          // Move Mistral more centered and a bit lower
          pos.x = containerWidth / 2 + (Math.random() - 0.5) * 60;
          pos.y = containerHeight / 2 + (Math.random() - 0.5) * 40 + 30; // 30px lower
        }
        if (pos.id === 'DeepSeek') {
          // Move DeepSeek under Grok, slightly to the right, same height as Qwen/Llama/Phi
          const grokNode = positions.find(p => p.id === 'Grok');
          const phiNode = positions.find(p => p.id === 'Phi');
          if (grokNode && phiNode) {
            pos.x = grokNode.x + 30; // Slightly to the right of Grok
            pos.y = phiNode.y; // Same height as Phi/Qwen
          }
        }
        if (pos.id === 'Gemini') {
          // Move Gemini significantly higher than GPT, Claude, and Grok
          pos.y = Math.max(margin + 20, pos.y - 65); // 65px higher, but not too close to top
        }
        if (pos.id === 'Claude') {
          // Move Claude a bit to the right
          pos.x = pos.x + 40; // 40px to the right
        }
      });
    }

    setNodePositions(positions);

    // Generate connections - ensure each node has exactly 4 connections
    const newConnections: Connection[] = [];
    const nodeConnections: { [key: string]: number } = {};
    
    // Initialize connection count for each node
    positions.forEach(pos => {
      nodeConnections[pos.id] = 0;
    });

    // First pass: connect each node to its 4 nearest neighbors
    positions.forEach((node) => {
      if (nodeConnections[node.id] >= 4) return;
      
      // Find nearest nodes that still need connections
      const availableNodes = positions
        .filter(other => 
          other.id !== node.id && 
          nodeConnections[other.id] < 4 &&
          !newConnections.some(conn => 
            (conn.from === node.id && conn.to === other.id) ||
            (conn.from === other.id && conn.to === node.id)
          )
        )
        .map(other => ({
          node: other,
          distance: Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2))
        }))
        .sort((a, b) => a.distance - b.distance);

      // Connect to up to 4 nearest available nodes
      const connectionsNeeded = Math.min(4 - nodeConnections[node.id], availableNodes.length);
      
      for (let i = 0; i < connectionsNeeded; i++) {
        const target = availableNodes[i].node;
        
        if (nodeConnections[target.id] < 4) {
          const pathD = `M ${node.x} ${node.y} L ${target.x} ${target.y}`;
          newConnections.push({
            from: node.id,
            to: target.id,
            pathD
          });
          
          nodeConnections[node.id]++;
          nodeConnections[target.id]++;
        }
      }
    });

    // Second pass: ensure all nodes have at least 4 connections
    positions.forEach((node) => {
      if (nodeConnections[node.id] < 4) {
        const availableNodes = positions
          .filter(other => 
            other.id !== node.id &&
            !newConnections.some(conn => 
              (conn.from === node.id && conn.to === other.id) ||
              (conn.from === other.id && conn.to === node.id)
            )
          )
          .map(other => ({
            node: other,
            distance: Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2))
          }))
          .sort((a, b) => a.distance - b.distance);

        const connectionsNeeded = 4 - nodeConnections[node.id];
        
        for (let i = 0; i < Math.min(connectionsNeeded, availableNodes.length); i++) {
          const target = availableNodes[i].node;
          const pathD = `M ${node.x} ${node.y} L ${target.x} ${target.y}`;
          newConnections.push({
            from: node.id,
            to: target.id,
            pathD
          });
          
          nodeConnections[node.id]++;
          nodeConnections[target.id]++;
        }
      }
    });

    setConnections(newConnections);
  }, [data.options, containerDimensions]);

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
    setShowError(false);

    // Trigger spark animation only on the selected node's connections
    const connectedPaths = connections.filter(conn => 
      conn.from === option || conn.to === option
    );
    
    // Light up all connections of the selected node simultaneously
    connectedPaths.forEach((conn) => {
      setSparkingPath(conn.pathD);
    });
    
    // Clear the sparking after animation
    setTimeout(() => setSparkingPath(null), 1200);
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
          <div className="text-center mb-8 mt-16">
            <h1 className="text-responsive-title font-bold mb-1 text-white font-open-sauce">{data.title}</h1>
            <p className="text-responsive-subtitle text-slate-50 font-normal font-open-sauce">
              {data.subtitle}
            </p>
          </div>

          {/* Network visualization */}
          <div className="relative flex justify-center mb-8 -mt-8">
            <div 
              ref={containerRef}
              className="relative w-full max-w-4xl h-64 sm:h-80 md:h-96 z-10"
            >
              {/* SVG for connections */}
              <svg 
                ref={svgRef}
                className="absolute inset-0 w-full h-full z-0"
                viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ pointerEvents: 'none' }}
              >
                {/* Connection lines */}
                {connections.map((connection, index) => {
                  const isConnectedToSelected = selectedOptions.some(selected => 
                    connection.from === selected || connection.to === selected
                  );
                  
                  return (
                    <g key={`${connection.from}-${connection.to}`}>
                      <path
                        d={connection.pathD}
                        stroke={isConnectedToSelected ? "#5CE1E6" : "#6b7280"}
                        strokeWidth={isConnectedToSelected ? "2" : "1"}
                        fill="none"
                        className={isConnectedToSelected ? "opacity-80" : "opacity-40"}
                        style={isConnectedToSelected ? {
                          filter: 'drop-shadow(0 0 4px #5CE1E6)',
                          animation: sparkingPath === connection.pathD ? 'pulse 1.2s ease-in-out' : 'none'
                        } : {}}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* LLM nodes */}
              {nodePositions.map((position, index) => (
                <button
                  key={position.id}
                  onClick={() => handleOptionSelect(position.id)}
                  className={cn(
                    "absolute transform -translate-x-1/2 -translate-y-1/2 rounded-lg transition-all duration-300 font-medium z-20",
                    "hover:scale-110 focus:outline-none cursor-pointer animate-fade-in",
                    "px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base", // Responsive sizing
                    selectedOptions.includes(position.id)
                      ? "bg-[#5CE1E6]/20 text-[#5CE1E6] border-2 border-[#5CE1E6] shadow-[0_0_20px_#5CE1E6]"
                      : "bg-[#1e293b]/80 text-white border border-gray-600 hover:bg-[#5CE1E6]/10 hover:text-[#5CE1E6]"
                  )}
                  style={{
                    left: `${(position.x / containerDimensions.width) * 100}%`,
                    top: `${(position.y / containerDimensions.height) * 100}%`,
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
            <div className="text-center mb-8 -mt-4">
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
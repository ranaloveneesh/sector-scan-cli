import React from 'react';
import { Database, Cog, Brain, Workflow } from 'lucide-react';

interface AgentExplainedVisualProps {
  className?: string;
}

const AgentExplainedVisual: React.FC<AgentExplainedVisualProps> = ({ className = "" }) => {
  const nodes = [
    {
      id: 'tools',
      name: 'TOOLS',
      description: 'Domain-specific instruments\n(Industry APIs, specialized software...)',
      icon: Cog,
      position: { x: -200, y: -140 }, // top left
      angle: 225 // for connection line
    },
    {
      id: 'data',
      name: 'KNOWLEDGE / DATA',
      description: 'Domain-specific information\n(Industry data, real-time inputs...)',
      icon: Database,
      position: { x: 200, y: -140 }, // top right
      angle: 315 // for connection line
    },
    {
      id: 'reasoning',
      name: 'PLANNING & REASONING',
      description: 'Domain-specific meta-heuristics\nalgorithms',
      icon: Brain,
      position: { x: -200, y: 140 }, // bottom left
      angle: 135 // for connection line
    },
    {
      id: 'workflows',
      name: 'EXECUTION',
      description: 'Domain-specific workflows\n(Industry processes, protocols...)',
      icon: Workflow,
      position: { x: 200, y: 140 }, // bottom right
      angle: 45 // for connection line
    }
  ];

  return (
    <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
      {/* Main heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-primary font-open-sauce mb-2">
          Specialized assistants, not just AI tools
        </h2>
      </div>

      {/* Main container */}
      <div className="relative w-full h-[500px] flex items-center justify-center">
        {/* Connection lines with glow effect */}
        {nodes.map((node) => {
          const radian = (node.angle * Math.PI) / 180;
          const centerRadius = 80;
          const nodeRadius = 220;
          
          const startX = Math.cos(radian) * centerRadius;
          const startY = Math.sin(radian) * centerRadius;
          const endX = Math.cos(radian) * nodeRadius;
          const endY = Math.sin(radian) * nodeRadius;
          
          return (
            <svg
              key={`connection-${node.id}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {/* Glow effect */}
              <defs>
                <filter id={`glow-${node.id}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <line
                x1={`calc(50% + ${startX}px)`}
                y1={`calc(50% + ${startY}px)`}
                x2={`calc(50% + ${endX}px)`}
                y2={`calc(50% + ${endY}px)`}
                stroke="hsl(var(--neon-cyan))"
                strokeWidth="2"
                filter={`url(#glow-${node.id})`}
                opacity="0.8"
              />
            </svg>
          );
        })}

        {/* Central Agent with enhanced styling */}
        <div className="relative z-20">
          {/* Outer ring */}
          <div className="absolute inset-0 w-40 h-40 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '20s' }}></div>
          
          {/* Inner glow */}
          <div className="absolute inset-2 w-36 h-36 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-sm"></div>
          
          {/* Main agent container */}
          <div className="relative w-40 h-40 bg-card border-2 border-primary/50 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
            <div className="w-28 h-28 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png" 
                alt="AI Agent" 
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
          
          {/* Agent label */}
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-lg font-bold text-primary mb-1">SPAIDER AGENT</div>
            <div className="text-sm text-muted-foreground">In-house trained AI models</div>
          </div>
        </div>

        {/* Custom styled nodes */}
        {nodes.map((node) => {
          const IconComponent = node.icon;
          return (
            <div
              key={node.id}
              className="absolute z-30"
              style={{
                transform: `translate(${node.position.x}px, ${node.position.y}px)`,
              }}
            >
              {/* Node container with sci-fi styling */}
              <div className="flex flex-col items-center max-w-60">
                {/* Node circle with enhanced sci-fi design */}
                <div className="relative mb-4">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-24 h-24 rounded-full bg-primary/20 blur-md"></div>
                  
                  {/* Main node */}
                  <div className="relative w-24 h-24 bg-card border-2 border-primary/60 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                    {/* Inner content area */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-transparent rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Corner accent dots */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary/60 rounded-full"></div>
                </div>
                
                {/* Node content with enhanced typography */}
                <div className="text-center">
                  <h3 className="text-sm font-bold text-primary mb-3 tracking-wider">
                    {node.name}
                  </h3>
                  <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-3">
                    <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                      {node.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentExplainedVisual;
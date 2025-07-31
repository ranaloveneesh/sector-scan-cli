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
    <div className={`relative w-full max-w-7xl mx-auto px-8 ${className}`}>
      {/* Main heading */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-primary font-open-sauce mb-2">
          Specialized assistants, not just AI tools
        </h2>
      </div>

      {/* Main container */}
      <div className="relative w-full h-[400px] flex items-center justify-center">
        {/* Connection lines */}
        {nodes.map((node) => {
          const radian = (node.angle * Math.PI) / 180;
          const centerRadius = 60;
          const nodeRadius = 180;
          
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
              <line
                x1={`calc(50% + ${startX}px)`}
                y1={`calc(50% + ${startY}px)`}
                x2={`calc(50% + ${endX}px)`}
                y2={`calc(50% + ${endY}px)`}
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          );
        })}

        {/* Central Agent - minimalist */}
        <div className="relative z-20">
          <div className="w-32 h-32 rounded-full flex items-center justify-center">
            <img 
              src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png" 
              alt="AI Agent" 
              className="w-24 h-24 object-contain"
            />
          </div>
          
          {/* Agent label */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
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
              {/* Minimalist node design */}
              <div className="flex flex-col items-center max-w-64">
                {/* Simple node circle */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-background border border-primary/40 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                {/* Clean node content */}
                <div className="text-center">
                  <h3 className="text-sm font-bold text-primary mb-2 tracking-wide">
                    {node.name}
                  </h3>
                  <div className="bg-background/60 border border-primary/20 rounded-md p-3">
                    <p className="text-xs text-foreground/70 leading-relaxed whitespace-pre-line">
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
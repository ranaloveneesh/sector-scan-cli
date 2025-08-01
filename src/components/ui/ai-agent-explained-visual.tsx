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
      position: { x: -350, y: -80 }, // top left
    },
    {
      id: 'data',
      name: 'KNOWLEDGE / DATA', 
      description: 'Domain-specific information\n(Industry data, real-time inputs...)',
      icon: Database,
      position: { x: 350, y: -80 }, // top right
    },
    {
      id: 'reasoning',
      name: 'PLANNING & REASONING',
      description: 'Domain-specific meta-heuristics\nalgorithms',
      icon: Brain,
      position: { x: -350, y: 80 }, // bottom left
    },
    {
      id: 'workflows',
      name: 'EXECUTION',
      description: 'Domain-specific workflows\n(Industry processes, protocols...)',
      icon: Workflow,
      position: { x: 350, y: 80 }, // bottom right
    }
  ];

  return (
    <div className={`relative w-full max-w-[90rem] mx-auto px-16 ${className}`}>
      {/* Main heading */}
      <div className="text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-primary font-open-sauce mb-2">
          Specialized assistants, not just AI tools
        </h2>
      </div>

      {/* Main container */}
      <div className="relative w-full h-[500px] flex items-center justify-center">
        
        
        {/* Connection lines - Simple approach with individual positioned lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {/* Line to TOOLS (top left) */}
          <div 
            className="absolute bg-cyan-400"
            style={{
              left: '50%',
              top: '50%',
              width: '2px',
              height: `${Math.sqrt(350*350 + 80*80)}px`,
              transformOrigin: 'top center',
              transform: `translate(-1px, 0) rotate(${Math.atan2(-80, -350) * 180 / Math.PI}deg)`
            }}
          ></div>
          
          {/* Line to KNOWLEDGE/DATA (top right) */}
          <div 
            className="absolute bg-cyan-400"
            style={{
              left: '50%',
              top: '50%',
              width: '2px',
              height: `${Math.sqrt(350*350 + 80*80)}px`,
              transformOrigin: 'top center',
              transform: `translate(-1px, 0) rotate(${Math.atan2(-80, 350) * 180 / Math.PI}deg)`
            }}
          ></div>
          
          {/* Line to REASONING (bottom left) */}
          <div 
            className="absolute bg-cyan-400"
            style={{
              left: '50%',
              top: '50%',
              width: '2px',
              height: `${Math.sqrt(350*350 + 80*80)}px`,
              transformOrigin: 'top center',
              transform: `translate(-1px, 0) rotate(${Math.atan2(80, -350) * 180 / Math.PI}deg)`
            }}
          ></div>
          
          {/* Line to EXECUTION (bottom right) */}
          <div 
            className="absolute bg-cyan-400"
            style={{
              left: '50%',
              top: '50%',
              width: '2px',
              height: `${Math.sqrt(350*350 + 80*80)}px`,
              transformOrigin: 'top center',
              transform: `translate(-1px, 0) rotate(${Math.atan2(80, 350) * 180 / Math.PI}deg)`
            }}
          ></div>
        </div>

        {/* Central Agent */}
        <div className="relative z-20">
          <div className="w-32 h-32 flex items-center justify-center">
            <img 
              src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png" 
              alt="AI Agent" 
              className="w-24 h-24 object-contain"
            />
          </div>
          
          {/* Agent label */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-lg font-bold text-primary">AI AGENT</div>
          </div>
        </div>

        {/* Nodes */}
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
              <div className="flex flex-col items-center max-w-72">
                {/* Node icon */}
                <div className="w-12 h-12 bg-background border-2 border-cyan-400 rounded-full flex items-center justify-center mb-3">
                  <IconComponent className="w-5 h-5 text-cyan-400" />
                </div>
                
                {/* Node content */}
                <div className="text-center">
                  <h3 className="text-sm font-bold text-primary mb-2 tracking-wide">
                    {node.name}
                  </h3>
                  <div className="bg-background/50 border border-primary/15 rounded-lg p-3">
                    <p className="text-xs text-foreground/60 leading-relaxed whitespace-pre-line">
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
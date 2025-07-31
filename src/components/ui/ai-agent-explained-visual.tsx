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
      position: { x: -180, y: -120 }, // top left
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 'data',
      name: 'KNOWLEDGE / DATA',
      description: 'Domain-specific information\n(Industry data, real-time inputs...)',
      icon: Database,
      position: { x: 180, y: -120 }, // top right
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'reasoning',
      name: 'PLANNING & REASONING',
      description: 'Domain-specific meta-heuristics\nalgorithms',
      icon: Brain,
      position: { x: -180, y: 120 }, // bottom left
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 'workflows',
      name: 'EXECUTION',
      description: 'Domain-specific workflows\n(Industry processes, protocols...)',
      icon: Workflow,
      position: { x: 180, y: 120 }, // bottom right
      color: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Main heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 font-open-sauce mb-2">
          Specialized assistants, not just AI tools
        </h2>
      </div>

      {/* Central agent container */}
      <div className="relative w-full h-96 flex items-center justify-center">
        {/* Connection lines */}
        {nodes.map((node) => (
          <svg
            key={`line-${node.id}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <line
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${node.position.x}px)`}
              y2={`calc(50% + ${node.position.y}px)`}
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        ))}

        {/* Central Agent */}
        <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <img 
            src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png" 
            alt="AI Agent" 
            className="w-24 h-24 object-contain"
          />
          {/* Agent label */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-lg font-bold text-cyan-400 mb-1">SPAIDER AGENT</div>
            <div className="text-sm text-slate-300">In-house trained AI models</div>
          </div>
        </div>

        {/* Node elements */}
        {nodes.map((node) => {
          const IconComponent = node.icon;
          return (
            <div
              key={node.id}
              className="absolute z-20"
              style={{
                transform: `translate(${node.position.x}px, ${node.position.y}px)`,
              }}
            >
              {/* Node circle */}
              <div className={`w-20 h-20 bg-gradient-to-br ${node.color} rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              
              {/* Node content */}
              <div className="text-center max-w-48">
                <h3 className="text-sm font-bold text-cyan-400 mb-2 whitespace-nowrap">
                  {node.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {node.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentExplainedVisual;
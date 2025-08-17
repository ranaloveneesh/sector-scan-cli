import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- Custom SVG Icons for the Metallic 3D Look ---

const ToolsIcon = ({ cx, cy }) => (
  <g transform={`translate(${cx - 30}, ${cy - 30})`}>
    <defs>
      <radialGradient id="grad_silver" cx="50%" cy="40%" r="60%" fx="50%" fy="40%">
        <stop offset="0%" style={{ stopColor: '#FFFFFF' }} />
        <stop offset="100%" style={{ stopColor: '#BCC6D1' }} />
      </radialGradient>
    </defs>
    <circle cx="30" cy="30" r="28" fill="url(#grad_silver)" stroke="#9DA7B3" strokeWidth="2"/>
    <path d="M25.4,38.8l-5.3-5.3c-1-1-1.5-2.3-1.5-3.6v-2.3l-4.5-4.5c-0.6-0.6-0.6-1.5,0-2.1l3.5-3.5c0.6-0.6,1.5-0.6,2.1,0l4.5,4.5h2.3c1.3,0,2.6-0.5,3.6-1.5l5.3-5.3c1.2-1.2,3.1-1.2,4.2,0l3.5,3.5c1.2,1.2,1.2,3.1,0,4.2l-5.3,5.3c-1,1-2.3,1.5-3.6,1.5h-2.3l-4.5,4.5c-0.6,0.6-1.5,0.6-2.1,0l-3.5-3.5C24.2,41.9,24.2,40,25.4,38.8z" fill="#334155"/>
    <circle cx="30" cy="30" r="4" fill="#F8FAFC" />
  </g>
);

const DataIcon = ({ cx, cy }) => (
    <g transform={`translate(${cx - 30}, ${cy - 30})`}>
    <circle cx="30" cy="30" r="28" fill="url(#grad_silver)" stroke="#9DA7B3" strokeWidth="2"/>
    <g stroke="#334155" strokeWidth="2" fill="#CBD5E1">
        <ellipse cx="30" cy="22" rx="12" ry="5" />
        <path d="M18,22 V38 C18,43,42,43,42,38 V22" fill="none"/>
        <ellipse cx="30" cy="22" rx="12" ry="5" fillOpacity="0.5"/>
        <ellipse cx="30" cy="30" rx="12" ry="5" />
        <ellipse cx="30" cy="38" rx="12" ry="5" />
    </g>
  </g>
);

const PlanningIcon = ({ cx, cy }) => (
    <g transform={`translate(${cx - 30}, ${cy - 30})`}>
    <circle cx="30" cy="30" r="28" fill="url(#grad_silver)" stroke="#9DA7B3" strokeWidth="2"/>
     <g fill="none" stroke="#334155" strokeWidth="2.5">
        <circle cx="30" cy="30" r="12" />
        <circle cx="30" cy="30" r="5" />
     </g>
    <line x1="30" y1="12" x2="30" y2="4" stroke="#334155" strokeWidth="2.5" />
    <line x1="30" y1="48" x2="30" y2="36" stroke="#334155" strokeWidth="2.5" />
    <g transform="translate(16, 23)" stroke="#334155" strokeWidth="2">
        <line x1="0" y1="0" x2="6" y2="6"/>
        <line x1="0" y1="6" x2="6" y2="0"/>
    </g>
  </g>
);

const ExecutionIcon = ({ cx, cy }) => (
    <g transform={`translate(${cx - 30}, ${cy - 30})`}>
    <circle cx="30" cy="30" r="28" fill="url(#grad_silver)" stroke="#9DA7B3" strokeWidth="2"/>
    <g fill="#CBD5E1" stroke="#334155" strokeWidth="1.5">
        <rect x="16" y="16" width="24" height="6" rx="1" />
        <rect x="16" y="27" width="24" height="6" rx="1" />
        <rect x="16" y="38" width="12" height="6" rx="1" />
    </g>
     <g fill="#334155">
        <path d="M18 19 L22 22 L18 25 Z" />
        <path d="M18 30 L22 33 L18 36 Z" />
     </g>
  </g>
);


const AIAgentExplained = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/model-utility');
  };

  const components = [
    {
      id: 'tools',
      title: "TOOLS",
      subtitle: "Industry standard tools",
      icon: ToolsIcon,
      coords: { x: 150, y: 150 }
    },
    {
      id: 'data',
      title: "KNOWLEDGE / DATA",
      subtitle: "Industry Public / Proprietary Data",
      icon: DataIcon,
      coords: { x: 650, y: 150 }
    },
    {
      id: 'planning',
      title: "PLANNING & REASONING",
      subtitle: "Domain-specific meta-heuristics algorithms",
      icon: PlanningIcon,
      coords: { x: 150, y: 450 }
    },
    {
      id: 'execution',
      title: "EXECUTION",
      subtitle: "Domain Specific Workflows",
      icon: ExecutionIcon,
      coords: { x: 650, y: 450 }
    }
  ];
  
  const center = { x: 400, y: 300 };

  return (
    <div className="min-h-screen bg-[#0A1628] text-white flex flex-col items-center justify-center font-sans relative overflow-hidden">

      {/* Header Elements */}
       <div className="absolute top-8 right-10 md:right-16 z-10">
         <span className="font-mono text-lg text-[#5CE1E6] neon-glow-subtle">ai_agent_explained</span>
       </div>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">AI agents are specialized assistants, not just tools.</h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10">AI agents combine these 4 components to work autonomously in specific domains</p>

        {/* --- SVG Diagram --- */}
        <div className="w-full h-[600px] relative">
            <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">

                {/* Connection Lines */}
                {components.map(comp => (
                    <line 
                        key={`line-${comp.id}`}
                        x1={center.x}
                        y1={center.y}
                        x2={comp.coords.x}
                        y2={comp.coords.y}
                        stroke="#4A5568"
                        strokeWidth="1.5"
                    />
                ))}

                {/* Central AI Agent */}
                <g>
                    <foreignObject x={center.x - 75} y={center.y - 75} width="150" height="150">
                        <div className="w-full h-full flex items-center justify-center animate-fade-in">
                            <img 
                                src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png" 
                                alt="AI Agent"
                                className="w-28 h-28 object-contain drop-shadow-xl"
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x={center.x - 75} y={center.y + 45} width="150" height="30">
                        <div className="text-center font-bold text-base bg-[#4A044E] border border-purple-400 rounded-lg px-3 py-1 text-purple-300">
                           AI AGENT
                        </div>
                    </foreignObject>
                </g>

                {/* Component Nodes */}
                {components.map(comp => {
                    const Icon = comp.icon;
                    return (
                        <g key={`comp-${comp.id}`} className="animate-fade-in" style={{ animationDelay: `${200 + components.indexOf(comp) * 100}ms` }}>
                            <Icon cx={comp.coords.x} cy={comp.coords.y} />
                            <foreignObject 
                                x={comp.coords.x - 100} 
                                y={comp.coords.y + 40} 
                                width="200" 
                                height="100"
                            >
                                <div className="text-center flex flex-col items-center">
                                    <h3 className="font-bold text-sm text-[#5CE1E6] tracking-wider mb-2">{comp.title}</h3>
                                    <div className="bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2">
                                        <p className="text-slate-300 text-xs leading-snug">{comp.subtitle}</p>
                                    </div>
                                </div>
                            </foreignObject>
                        </g>
                    );
                })}

            </svg>
        </div>
      </div>

       {/* Footer Elements */}
       <div className="absolute bottom-8 left-10 md:left-16 font-mono text-lg text-gray-400 flex items-center">
           <span>&gt; explaining AI agents.</span>
           <span className="bg-gray-400 w-2 h-5 ml-1 animate-pulse"></span>
       </div>
       <div className="absolute bottom-8 right-10 md:right-16">
            <button 
                onClick={handleSubmit} 
                className="px-8 py-3 bg-[#5CE1E6] text-[#0A1628] font-bold rounded-lg transition-transform hover:scale-105"
            >
                Next →
            </button>
       </div>
    </div>
  );
};

export default AIAgentExplained;
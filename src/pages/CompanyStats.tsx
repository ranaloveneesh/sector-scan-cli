import React from 'react';
import { useNavigate } from 'react-router-dom';
import aiAdoptionChart from '@/assets/ai-adoption-chart.png';

const CompanyStats = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/aiagents');
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
      {/* Hexagonal logo in top left */}
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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">company_stats</span>
      </div>

      {/* Main content - positioned to align with logo */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="max-w-4xl w-full text-center" style={{ paddingTop: 'clamp(2rem, 5vh, 3rem)' }}>
          
          {/* Compact title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-white font-open-sauce leading-relaxed">
            78% of companies want to integrate AI into their workflows, but most aren't ready for it
          </h1>

          {/* Chart and stats combined */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-8">
            {/* Animated Trend Chart */}
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 md:p-6 flex-1 max-w-md h-[216px] flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 300 180" className="w-full h-full">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="30" height="18" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Trend line path */}
                <path
                  d="M 20 160 Q 80 140 120 100 Q 160 60 200 40 Q 240 20 280 10"
                  fill="none"
                  stroke="#5CE1E6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-[draw-line_2s_ease-out_forwards]"
                  style={{
                    strokeDasharray: '400',
                    strokeDashoffset: '400',
                  }}
                />
                
                {/* Data points */}
                <circle cx="20" cy="160" r="4" fill="#5CE1E6" className="animate-[fade-in_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0 }} />
                <circle cx="120" cy="100" r="4" fill="#5CE1E6" className="animate-[fade-in_0.5s_ease-out_0.8s_forwards]" style={{ opacity: 0 }} />
                <circle cx="200" cy="40" r="4" fill="#5CE1E6" className="animate-[fade-in_0.5s_ease-out_1.3s_forwards]" style={{ opacity: 0 }} />
                <circle cx="280" cy="10" r="4" fill="#5CE1E6" className="animate-[fade-in_0.5s_ease-out_1.8s_forwards]" style={{ opacity: 0 }} />
              </svg>
            </div>

            {/* Key stats */}
            <div className="flex-1 max-w-sm space-y-4">
              <div className="bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 rounded-lg p-4 md:p-6">
                <div className="text-2xl md:text-3xl font-bold text-[#5CE1E6] mb-2">78%</div>
                <p className="text-sm md:text-base text-slate-300 font-open-sauce">
                  Want AI integration
                </p>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 md:p-6">
                <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">22%</div>
                <p className="text-sm md:text-base text-slate-300 font-open-sauce">
                  Actually ready to implement
                </p>
              </div>
            </div>
          </div>

          {/* Brief insight */}
          <p className="text-sm md:text-base text-slate-400 font-open-sauce max-w-2xl mx-auto">
            Many companies want to integrate AI in their workflows, but few are truly prepared for it. This gap between desire and readiness reveals a major need for straightforward AI training and practical implementation roadmaps.
          </p>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">analyzing AI adoption trends...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit} 
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80"
          style={{
            pointerEvents: 'auto',
            zIndex: 10
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default CompanyStats;
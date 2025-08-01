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
            {/* Animated Professional Chart */}
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 md:p-6 flex-1 max-w-md h-[250px] flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 320 200" className="w-full h-full">
                {/* Professional grid */}
                <defs>
                  <pattern id="grid" width="32" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                  </pattern>
                  <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5CE1E6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#5CE1E6" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
                
                {/* Grid background */}
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Y-axis labels */}
                <text x="15" y="25" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="end">100%</text>
                <text x="15" y="65" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="end">75%</text>
                <text x="15" y="105" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="end">50%</text>
                <text x="15" y="145" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="end">25%</text>
                <text x="15" y="185" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="end">0%</text>
                
                {/* Horizontal grid lines */}
                <line x1="25" y1="20" x2="310" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                <line x1="25" y1="60" x2="310" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                <line x1="25" y1="100" x2="310" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                <line x1="25" y1="140" x2="310" y2="140" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                <line x1="25" y1="180" x2="310" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                
                {/* Trend line following specific percentages: 0%, 25%, 20%, 55%, 48%, 78% */}
                <path
                  d="M 25 180 L 75 140 L 125 148 L 175 92 L 225 103 L 275 55"
                  fill="none"
                  stroke="#5CE1E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-[draw-trend_2s_ease-out_forwards]"
                  style={{
                    strokeDasharray: '400',
                    strokeDashoffset: '400',
                  }}
                />
                
                {/* Data points at specified percentages */}
                <circle cx="25" cy="180" r="3" fill="#5CE1E6" className="animate-[fade-in_0.3s_ease-out_0.3s_forwards]" style={{ opacity: 0 }} />
                <circle cx="75" cy="140" r="3" fill="#5CE1E6" className="animate-[fade-in_0.3s_ease-out_0.6s_forwards]" style={{ opacity: 0 }} />
                <circle cx="125" cy="148" r="3" fill="#5CE1E6" className="animate-[fade-in_0.3s_ease-out_0.9s_forwards]" style={{ opacity: 0 }} />
                <circle cx="175" cy="92" r="3" fill="#5CE1E6" className="animate-[fade-in_0.3s_ease-out_1.2s_forwards]" style={{ opacity: 0 }} />
                <circle cx="225" cy="103" r="3" fill="#5CE1E6" className="animate-[fade-in_0.3s_ease-out_1.5s_forwards]" style={{ opacity: 0 }} />
                <circle cx="275" cy="55" r="3" fill="#5CE1E6" className="animate-[fade-in_0.3s_ease-out_1.8s_forwards]" style={{ opacity: 0 }} />
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
            This gap between desire and readiness reveals a major need for straightforward AI training and practical implementation roadmaps.
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
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

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-32 lg:px-48 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="max-w-6xl w-full text-center">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold mb-6 text-white font-open-sauce leading-relaxed">
            The AI Adoption Gap: Intent vs. Reality
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-xl font-normal text-slate-100 font-open-sauce leading-relaxed max-w-4xl mx-auto mb-12">
            78% of companies want to integrate AI into their workflows, but most aren't ready to take the leap. Here's what the data shows about the growing demand for AI solutions.
          </p>

          {/* Chart */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 border border-white/20 rounded-xl p-8 max-w-3xl w-full">
              <img 
                src={aiAdoptionChart} 
                alt="AI Adoption Statistics Chart" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Key statistic */}
          <div className="bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 rounded-xl p-8 max-w-2xl mx-auto">
            <div className="text-4xl md:text-5xl font-bold text-[#5CE1E6] mb-2">78%</div>
            <p className="text-lg text-slate-100 font-open-sauce">
              of companies recognize AI's potential to transform their workflows, but lack the knowledge and infrastructure to implement it effectively.
            </p>
          </div>
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
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce"
          style={{
            backgroundColor: '#5CE1E6',
            color: '#0a1628',
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
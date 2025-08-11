import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ragDemoData } from '@/data/ragDemoData';

const RagDemo = () => {
  const navigate = useNavigate();

  const handleTopicSelect = (topicId: string) => {
    navigate(`/rag-demo/${topicId}`);
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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">rag_demo</span>
      </div>

      {/* Main content */}
      <div className="absolute left-6 right-6 md:left-16 md:right-16 z-10 animate-fade-in flex flex-col items-center" style={{ animationDelay: '250ms', top: 'calc(clamp(4rem, 6vw, 6.25rem) + 6rem)' }}>
        <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed max-w-4xl text-center mb-2">
          {ragDemoData.explainer_title}
        </h1>
        <p className="text-lg md:text-xl lg:text-xl font-normal text-slate-100 font-open-sauce leading-relaxed max-w-4xl text-center mb-12">
          {ragDemoData.explainer_description}
        </p>

        {/* Topic selection buttons */}
        <div className="flex flex-col space-y-4 w-full max-w-md">
          {ragDemoData.topics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => handleTopicSelect(topic.id)}
              className="w-full py-4 px-6 bg-white/10 border border-white/20 rounded-lg text-white font-open-sauce text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${400 + (index * 100)}ms` }}
            >
              {topic.button_label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal text in bottom left */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 z-10 animate-fade-in" style={{ animationDelay: '350ms' }}>
        <span className="font-tomorrow text-responsive-terminal text-gray-400">
          {"> exploring RAG capabilities..."}
        </span>
      </div>

      {/* Next button in bottom right */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 z-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <button
          onClick={() => navigate('/aiagents')}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce"
          style={{
            backgroundColor: '#5CE1E6',
            color: '#0a1628'
          }}
        >
          Skip Demo →
        </button>
      </div>
    </div>
  );
};

export default RagDemo;
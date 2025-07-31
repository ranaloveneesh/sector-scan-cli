import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import RagPipelineVisual from '@/components/ui/rag-pipeline-visual';

const RagPipelineExplained = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getContentBasedOnAnswer = () => {
    const previousAnswer = surveyData.ragPipelineKnowledge;
    
    switch (previousAnswer) {
      case "It's a tool that scrapes data from websites":
        return {
          title: "Here's a visual representation of RAG pipeline",
          subtitle: "With this method all your company knowledge can be stored and accessible inside your Vector DB"
        };
      case "A method to teach AI how to generate images":
        return {
          title: "Here's a visual representation of RAG pipeline",
          subtitle: "With this method all your company knowledge can be stored and accessible inside your Vector DB"
        };
      case "A system where an AI model retrieves external data before generating a response":
        return {
          title: "Here's a visual representation of RAG pipeline",
          subtitle: "With this method all your company knowledge can be stored and accessible inside your Vector DB"
        };
      case "I've seen it mentioned, but not sure what it means":
        return {
          title: "Here's a visual representation of RAG pipeline",
          subtitle: "With this method all your company knowledge can be stored and accessible inside your Vector DB"
        };
      case "Nope, this is new to me":
        return {
          title: "Here's a visual representation of RAG pipeline",
          subtitle: "With this method all your company knowledge can be stored and accessible inside your Vector DB"
        };
      default:
        return {
          title: "Here's a visual representation of RAG pipeline",
          subtitle: "With this method all your company knowledge can be stored and accessible inside your Vector DB"
        };
    }
  };

  const content = getContentBasedOnAnswer();
  
  const questionData = {
    id: "ragpipeline-explained",
    title: content.title,
    subtitle: content.subtitle,
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "explaining RAG pipelines...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "rag_pipeline_explained"
    },
    isStatic: true
  };

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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">{questionData.ui.label}</span>
      </div>

      {/* Title and subtitle */}
      <div className="absolute top-28 left-6 right-6 md:top-36 md:left-16 md:right-16 z-10 animate-fade-in flex flex-col items-center" style={{ animationDelay: '250ms' }}>
        <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed max-w-4xl text-center mb-2">
          {content.title}
        </h1>
        <p className="text-lg md:text-xl lg:text-xl font-normal text-slate-100 font-open-sauce leading-relaxed max-w-4xl text-center mb-4">
          {content.subtitle}
        </p>
      </div>

      {/* RAG Pipeline Visual */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-16 lg:px-24 pt-28 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <RagPipelineVisual />
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">{questionData.ui.animation_text}</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit} 
          className="sci-fi-arrow font-mono text-[#5CE1E6] text-responsive-button neon-glow transition-all duration-300 relative hover:text-[#5CE1E6]/80 digital-glitch-click cursor-pointer"
          data-text="next" 
          style={{
            pointerEvents: 'auto',
            zIndex: 10
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default RagPipelineExplained;
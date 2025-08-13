import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ragDemoData } from '@/data/ragDemoData';

const RagDemoTopic = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [currentStep, setCurrentStep] = useState<'llm' | 'rag' | 'summary'>('llm');
  const [showAnswer, setShowAnswer] = useState(false);
  const [documentDropped, setDocumentDropped] = useState(false);
  const [draggedOver, setDraggedOver] = useState(false);

  const topic = ragDemoData.topics.find(t => t.id === topicId);

  useEffect(() => {
    if (!topic) {
      navigate('/rag-demo');
    }
  }, [topic, navigate]);

  if (!topic) return null;

  const handleGetAnswer = () => {
    setShowAnswer(true);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'document');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDocumentDropped(true);
    setDraggedOver(false);
  };

  const handleNext = () => {
    if (currentStep === 'llm') {
      setCurrentStep('rag');
      setShowAnswer(false);
      setDocumentDropped(false);
    } else if (currentStep === 'rag') {
      setCurrentStep('summary');
    } else {
      navigate('/aiagents');
    }
  };

  const renderLLMStep = () => (
    <div className="flex flex-col items-center space-y-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed text-center">
        {topic.llm_only_flow.slide_title}
      </h1>
      <p className="text-lg md:text-xl text-slate-100 font-open-sauce leading-relaxed text-center">
        {topic.llm_only_flow.description}
      </p>
      
      {/* Chat interface mockup */}
      <div className="w-full max-w-2xl bg-white/10 border border-white/20 rounded-lg p-6">
        <div className="bg-[#5CE1E6]/20 text-white p-4 rounded-lg mb-4">
          <strong>You:</strong> {topic.user_query}
        </div>
        
        {showAnswer && (
          <div className="bg-white/10 text-white p-4 rounded-lg mb-4 animate-fade-in">
            <strong>AI:</strong> {topic.llm_only_flow.llm_output}
          </div>
        )}
        
        <button
          onClick={handleGetAnswer}
          disabled={showAnswer}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            showAnswer 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80'
          }`}
        >
          {showAnswer ? 'Answer Generated' : 'Get Answer'}
        </button>
      </div>
    </div>
  );

  const renderRAGStep = () => (
    <div className="flex flex-col items-center space-y-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed text-center">
        {topic.rag_flow.slide_title}
      </h1>
      <p className="text-lg md:text-xl text-slate-100 font-open-sauce leading-relaxed text-center">
        {topic.rag_flow.description}
      </p>
      
      {/* Drag and drop interface */}
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 w-full">
        {/* Document to drag */}
        <div className="flex-1 flex justify-center">
          <div
            draggable
            onDragStart={handleDragStart}
            className={`bg-white/10 border-2 border-dashed border-white/40 rounded-lg p-6 cursor-move transition-all duration-300 hover:bg-white/20 ${
              documentDropped ? 'opacity-50' : ''
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">📄</div>
              <div className="text-white font-medium">{topic.rag_flow.rag_context_document.title}</div>
              <div className="text-sm text-slate-300 mt-2">{documentDropped ? 'Document Used' : 'Drag me →'}</div>
            </div>
          </div>
        </div>

        {/* Drop zone */}
        <div className="flex-1 flex justify-center">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 w-full max-w-xs text-center transition-all duration-300 ${
              draggedOver 
                ? 'border-[#5CE1E6] bg-[#5CE1E6]/20' 
                : documentDropped 
                  ? 'border-green-400 bg-green-400/20' 
                  : 'border-white/40 bg-white/5'
            }`}
          >
            <div className="text-4xl mb-2">🤖</div>
            <div className="text-white font-medium">
              {documentDropped ? 'Context Loaded!' : 'Provide Context to AI'}
            </div>
          </div>
        </div>
      </div>

      {/* Chat interface */}
      <div className="w-full max-w-2xl bg-white/10 border border-white/20 rounded-lg p-6">
        <div className="bg-[#5CE1E6]/20 text-white p-4 rounded-lg mb-4">
          <strong>You:</strong> {topic.user_query}
        </div>
        
        {documentDropped && (
          <div className="bg-yellow-500/20 text-white p-3 rounded-lg mb-4 text-sm">
            📄 Context: {topic.rag_flow.rag_context_document.content}
          </div>
        )}
        
        {showAnswer && documentDropped && (
          <div className="bg-white/10 text-white p-4 rounded-lg mb-4 animate-fade-in">
            <strong>AI with RAG:</strong> {topic.rag_flow.llm_plus_rag_output}
          </div>
        )}
        
        <button
          onClick={handleGetAnswer}
          disabled={!documentDropped || showAnswer}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            !documentDropped || showAnswer
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80'
          }`}
        >
          {showAnswer ? 'New Answer Generated' : 'Get New Answer'}
        </button>
      </div>
    </div>
  );

  const renderSummaryStep = () => (
    <div className="flex flex-col items-center space-y-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed text-center">
        {ragDemoData.summary_slide.slide_title}
      </h1>
      
      {/* Side by side comparison */}
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-400 mb-4">Without RAG</h3>
          <p className="text-white text-sm italic">"{topic.llm_only_flow.llm_output}"</p>
        </div>
        
        <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4">With RAG</h3>
          <p className="text-white text-sm italic">"{topic.rag_flow.llm_plus_rag_output}"</p>
        </div>
      </div>
      
      <div className="bg-white/10 border border-white/20 rounded-lg p-6">
        <p className="text-lg text-white font-open-sauce leading-relaxed whitespace-pre-line">
          {ragDemoData.summary_slide.summary_text}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">

      {/* User label in top right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '150ms' }}>
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">rag_demo</span>
      </div>

      {/* Main content */}
      <div className="absolute top-24 left-6 right-6 md:top-32 md:left-16 md:right-16 z-10 animate-fade-in flex flex-col items-center min-h-[calc(100vh-200px)] justify-center" style={{ animationDelay: '250ms' }}>
        {currentStep === 'llm' && renderLLMStep()}
        {currentStep === 'rag' && renderRAGStep()}
        {currentStep === 'summary' && renderSummaryStep()}
      </div>

      {/* Terminal text in bottom left */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 z-10 animate-fade-in" style={{ animationDelay: '350ms' }}>
        <span className="font-tomorrow text-responsive-terminal text-gray-400">
          {`> step ${currentStep === 'llm' ? '1' : currentStep === 'rag' ? '2' : '3'} of 3...`}
        </span>
      </div>

      {/* Next button in bottom right */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 z-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <button
          onClick={handleNext}
          disabled={currentStep === 'llm' && !showAnswer}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce ${
            currentStep === 'llm' && !showAnswer
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80'
          }`}
        >
          {currentStep === 'summary' ? 'Continue →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default RagDemoTopic;
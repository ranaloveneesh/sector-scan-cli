import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { SynapticWeb } from '@/components/ui/synaptic-web';
import { Button } from '@/components/ui/button';

const LLMs = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [animationText, setAnimationText] = useState('');
  const [showError, setShowError] = useState(false);

  const models = [
    'ChatGPT',
    'Claude', 
    'Gemini',
    'Grok',
    'Mistral',
    'Llama',
    'Qwen',
    'DeepSeek',
    'Phi'
  ];

  // Terminal animation effect
  useEffect(() => {
    const text = 'scanning neural networks...';
    let index = 0;
    const interval = setInterval(() => {
      setAnimationText(text.slice(0, index));
      index++;
      if (index > text.length) {
        index = 0;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (selectedModels.length === 0) {
      setShowError(true);
      return;
    }
    
    updateSurveyData('llmKnowledge', selectedModels.join(', '));
    navigate('/'); // Update to next slide when created
  };

  const handleSelectionChange = (selected: string[]) => {
    setSelectedModels(selected);
    setShowError(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="text-2xl font-bold text-primary">LOGO</div>
      </div>

      {/* User label */}
      <div className="absolute top-8 right-8">
        <div className="text-sm text-muted-foreground">large_language_models</div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Terminal animation */}
          <div className="text-center mb-8">
            <div className="text-primary font-mono text-sm mb-4">
              {animationText}
              <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Question */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Which of these AI models have you heard of or used?
            </h1>
            <p className="text-xl text-muted-foreground">select all that apply</p>
          </div>

          {/* Synaptic Web */}
          <div className="flex justify-center">
            <SynapticWeb
              models={models}
              selectedModels={selectedModels}
              onSelectionChange={handleSelectionChange}
            />
          </div>

          {/* Error message */}
          {showError && (
            <div className="text-center">
              <p className="text-red-500 text-sm">Please select at least one option.</p>
            </div>
          )}

          {/* Next button */}
          <div className="flex justify-center pt-8">
            <Button 
              onClick={handleSubmit}
              className="px-8 py-2 text-lg"
              disabled={selectedModels.length === 0}
            >
              next
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-8">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          ← back
        </Button>
      </div>
    </div>
  );
};

export default LLMs;
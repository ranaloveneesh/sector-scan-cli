import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiModelGameData } from '@/data/aiModelGameData';
import brainIcon from '@/assets/brain-minimal.png';
import { playSound } from '@/lib/sound';

const AIModelGame = () => {
  const navigate = useNavigate();
  const [droppedComponents, setDroppedComponents] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const dragCounter = useRef(0);

  const data = aiModelGameData.interactive_game_slide;
  const correctComponents = data.components.filter(c => c.is_correct);
  const availableComponents = data.components.filter(c => !droppedComponents.includes(c.id));

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    e.dataTransfer.setData('text/plain', componentId);
    setDraggedItem(componentId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    
    const componentId = e.dataTransfer.getData('text/plain');
    const component = data.components.find(c => c.id === componentId);
    
    if (!component) return;

    if (component.is_correct && !droppedComponents.includes(componentId)) {
      setDroppedComponents(prev => [...prev, componentId]);
      setFeedback(component.explanation || '');
      setFeedbackType('success');
      playSound('click');
      
      if (droppedComponents.length + 1 === correctComponents.length) {
        setGameCompleted(true);
        setTimeout(() => {
          setFeedback(data.completion_message);
        }, 1500);
      }
    } else if (!component.is_correct) {
      setFeedback(component.rejection_feedback || '');
      setFeedbackType('error');
      playSound('click');
      setTimeout(() => {
        setFeedback('');
        setFeedbackType('');
      }, 3000);
    }
  };

  const handleNext = () => {
    navigate('/ai-model-summary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <img src={brainIcon} alt="Brain Logo" className="h-12 w-12" />
      </div>

      {/* Label */}
      <div className="absolute top-8 right-8 z-10">
        <span className="text-sm font-mono text-muted-foreground bg-background/80 px-3 py-1 rounded-full border">
          ai_model_builder
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-52 md:pt-52">
        <div className="w-full max-w-6xl mx-auto">
          {/* Terminal */}
          <div className="mb-8 text-center">
            <div className="text-muted-foreground font-mono text-sm">
              <span className="text-muted-foreground">&gt;</span> building ai model...
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">
            {data.slide_title}
          </h1>

          {/* Instruction */}
          <p className="text-lg md:text-xl text-foreground mb-8 text-center max-w-4xl mx-auto">
            {data.instruction}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Components */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground mb-4">Available Components</h3>
              <div className="grid grid-cols-2 gap-3">
                {availableComponents.map((component) => (
                  <div
                    key={component.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, component.id)}
                    onDragEnd={handleDragEnd}
                    className={`p-4 bg-card border-2 border-border rounded-lg cursor-move hover:border-primary transition-all duration-200 ${
                      draggedItem === component.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {component.label.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{component.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Core Drop Zone */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Model Core</h3>
              <div
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-80 h-80 border-4 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                  draggedItem ? 'border-primary bg-primary/5' : 'border-border bg-card/50'
                }`}
              >
                <div className="grid grid-cols-2 gap-4 w-full h-full p-6">
                  {Array.from({ length: 4 }).map((_, index) => {
                    const droppedComponent = droppedComponents[index];
                    const component = droppedComponent ? data.components.find(c => c.id === droppedComponent) : null;
                    
                    return (
                      <div
                        key={index}
                        className={`border-2 border-dashed rounded-lg flex items-center justify-center ${
                          component ? 'border-green-500 bg-green-500/10' : 'border-muted bg-muted/20'
                        }`}
                      >
                        {component ? (
                          <div className="text-center">
                            <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-1 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">✓</span>
                            </div>
                            <span className="text-xs font-medium text-foreground">{component.label}</span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="w-8 h-8 bg-muted rounded-lg mx-auto mb-1"></div>
                            <span className="text-xs text-muted-foreground">Slot {index + 1}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`mt-8 p-6 rounded-lg max-w-3xl mx-auto ${
              feedbackType === 'success' 
                ? 'bg-green-500/10 border border-green-500' 
                : feedbackType === 'error'
                ? 'bg-red-500/10 border border-red-500'
                : 'bg-primary/10 border border-primary'
            }`}>
              <p className="text-foreground text-center">{feedback}</p>
            </div>
          )}

          {/* Next Button */}
          {gameCompleted && (
            <div className="text-center mt-8">
              <button
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModelGame;
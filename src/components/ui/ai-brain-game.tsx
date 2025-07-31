import React, { useState, useRef } from 'react';
import { Button } from './button';
import brainOutline from '@/assets/ai-brain-outline.png';

interface BrainGameProps {
  onComplete: () => void;
}

interface Component {
  id: string;
  name: string;
  isCorrect: boolean;
  correctPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const components: Component[] = [
  { id: 'training-data', name: 'Training Data', isCorrect: true, correctPosition: 'top-left' },
  { id: 'algorithm', name: 'Algorithm', isCorrect: true, correctPosition: 'top-right' },
  { id: 'weights', name: 'Weights', isCorrect: true, correctPosition: 'bottom-left' },
  { id: 'inference', name: 'Inference', isCorrect: true, correctPosition: 'bottom-right' },
  { id: 'dashboard', name: 'Dashboard', isCorrect: false, correctPosition: 'top-left' },
  { id: 'cloud-access', name: 'Cloud Access', isCorrect: false, correctPosition: 'top-right' },
  { id: 'prompt', name: 'Prompt', isCorrect: false, correctPosition: 'bottom-left' },
  { id: 'ui-design', name: 'UI Design', isCorrect: false, correctPosition: 'bottom-right' },
];

const BrainGame: React.FC<BrainGameProps> = ({ onComplete }) => {
  const [droppedComponents, setDroppedComponents] = useState<{[key: string]: string}>({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const dragCounter = useRef(0);

  const showConfetti = () => {
    // Create confetti overlay
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(confettiContainer);

    // Create confetti pieces
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${['#5CE1E6', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)]};
        top: -10px;
        left: ${Math.random() * 100}%;
        border-radius: 50%;
        animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
      `;
      confettiContainer.appendChild(confetti);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Clean up after animation
    setTimeout(() => {
      document.body.removeChild(confettiContainer);
      document.head.removeChild(style);
    }, 4000);
  };

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    setDraggedItem(componentId);
    e.dataTransfer.setData('text/plain', componentId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--;
  };

  const handleDrop = (e: React.DragEvent, position: string) => {
    e.preventDefault();
    dragCounter.current = 0;
    const componentId = e.dataTransfer.getData('text/plain');
    
    // Remove component from any existing position
    const newDroppedComponents = { ...droppedComponents };
    Object.keys(newDroppedComponents).forEach(key => {
      if (newDroppedComponents[key] === componentId) {
        delete newDroppedComponents[key];
      }
    });
    
    // Add component to new position
    newDroppedComponents[position] = componentId;
    setDroppedComponents(newDroppedComponents);
    setDraggedItem(null);

    // Check if all positions are filled
    if (Object.keys(newDroppedComponents).length === 4) {
      checkCompletion(newDroppedComponents);
    }
  };

  const checkCompletion = (dropped: {[key: string]: string}) => {
    const correctComponents = components.filter(c => c.isCorrect);
    const isCorrect = correctComponents.every(component => {
      const droppedInCorrectPosition = dropped[component.correctPosition] === component.id;
      return droppedInCorrectPosition;
    });

    setIsSuccess(isCorrect);
    setGameCompleted(true);
    
    if (isCorrect) {
      // Show confetti animation
      showConfetti();
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const reset = () => {
    setDroppedComponents({});
    setGameCompleted(false);
    setIsSuccess(false);
    setDraggedItem(null);
  };

  const getAvailableComponents = () => {
    const droppedIds = Object.values(droppedComponents);
    return components.filter(c => !droppedIds.includes(c.id));
  };

  const getComponentInPosition = (position: string) => {
    const componentId = droppedComponents[position];
    return componentId ? components.find(c => c.id === componentId) : null;
  };

  const isPositionCorrect = (position: string) => {
    const component = getComponentInPosition(position);
    return component && component.isCorrect && component.correctPosition === position;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
      <div className="w-full max-w-6xl">
        {/* Question text */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Drag the 4 real components of an AI model into the brain.
            </h2>
          </div>

        <div className="flex items-center justify-between gap-8">
          {/* Left components */}
          <div className="flex flex-col gap-4 w-48">
            {getAvailableComponents().slice(0, 4).map((component) => (
              <div
                key={component.id}
                draggable
                onDragStart={(e) => handleDragStart(e, component.id)}
                className={`
                  p-4 rounded-lg border-2 border-dashed border-muted-foreground/30 
                  bg-card text-card-foreground text-center cursor-move
                  hover:border-primary hover:bg-primary/5 transition-all duration-200
                  ${draggedItem === component.id ? 'opacity-50' : ''}
                `}
              >
                {component.name}
              </div>
            ))}
          </div>

          {/* Center brain */}
          <div className="relative flex-1 max-w-md" style={{ transform: 'scale(0.7225)' }}>
            <img src={brainOutline} alt="AI Brain" className="w-full h-auto" />
            
            {/* Drop zones */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-8">
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => {
                const component = getComponentInPosition(position);
                const isCorrect = isPositionCorrect(position);
                
                return (
                  <div
                    key={position}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, position)}
                    className={`
                      rounded-lg border-2 border-dashed p-2 flex items-center justify-center
                      text-xs text-center transition-all duration-300
                      ${component 
                        ? (isCorrect 
                          ? 'bg-cyan-400/20 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] text-cyan-200' 
                          : 'bg-destructive/20 border-destructive text-destructive-foreground')
                        : 'border-muted-foreground/30 hover:border-primary'
                      }
                    `}
                  >
                    {component ? component.name : ''}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right components */}
          <div className="flex flex-col gap-4 w-48">
            {getAvailableComponents().slice(4).map((component) => (
              <div
                key={component.id}
                draggable
                onDragStart={(e) => handleDragStart(e, component.id)}
                className={`
                  p-4 rounded-lg border-2 border-dashed border-muted-foreground/30 
                  bg-card text-card-foreground text-center cursor-move
                  hover:border-primary hover:bg-primary/5 transition-all duration-200
                  ${draggedItem === component.id ? 'opacity-50' : ''}
                `}
              >
                {component.name}
              </div>
            ))}
          </div>
        </div>

        {/* Feedback and controls */}
        <div className="text-center mt-8">
          {gameCompleted && (
            <div className="mb-4">
              {isSuccess ? (
                <p className="text-green-400 text-xl font-semibold">
                  ✅ Nice job! That's the brain of an AI model.
                </p>
              ) : (
                <p className="text-red-400 text-xl font-semibold">
                  ❌ Hmm... not quite. Try again!
                </p>
              )}
            </div>
          )}
          
          {gameCompleted && !isSuccess && (
            <Button onClick={reset} variant="outline" size="lg">
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrainGame;
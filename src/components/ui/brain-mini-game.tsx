import React, { useState, useRef } from 'react';
import brainTopView from '@/assets/brain-top-view.png';

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

interface BrainMiniGameProps {
  onGameComplete: (success: boolean) => void;
}

const BrainMiniGame: React.FC<BrainMiniGameProps> = ({ onGameComplete }) => {
  const [droppedComponents, setDroppedComponents] = useState<{[key: string]: string}>({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const dragCounter = useRef(0);

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
    onGameComplete(isCorrect);
    
    if (isCorrect) {
      setTimeout(() => {
        // Auto proceed after success
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
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto relative">
      {/* Instruction text */}
      <div className="text-center mb-6">
        <p className="text-terminal-green font-mono text-lg">
          Drag the 4 real components of an AI model into the brain.
        </p>
      </div>

      <div className="flex items-center justify-between gap-8 w-full">
        {/* Left hemisphere components */}
        <div className="flex flex-col gap-4">
          {getAvailableComponents().slice(0, 4).map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component.id)}
              className={`
                relative w-24 h-12 flex items-center justify-center text-xs text-center cursor-move
                bg-gradient-to-br from-primary/20 to-primary/40 border border-primary/30
                transition-all duration-200 hover:border-primary hover:shadow-lg
                ${draggedItem === component.id ? 'opacity-50' : ''}
              `}
              style={{
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                transform: 'rotate(-10deg)'
              }}
            >
              <span className="text-primary-foreground font-mono">{component.name}</span>
            </div>
          ))}
        </div>

        {/* Center brain */}
        <div className="relative flex-shrink-0">
          <img src={brainTopView} alt="AI Brain" className="w-64 h-64" />
          
          {/* Drop zones over brain hemispheres */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-8">
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
                    flex items-center justify-center text-xs text-center transition-all duration-300
                    ${component 
                      ? (isCorrect 
                        ? 'bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.8)] text-cyan-200 rounded-full' 
                        : 'bg-destructive/20 text-destructive-foreground rounded-full')
                      : 'hover:bg-primary/10 rounded-full'
                    }
                  `}
                  style={{
                    borderRadius: '50%'
                  }}
                >
                  {component && (
                    <span className="font-mono text-xs px-1">
                      {component.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right hemisphere components */}
        <div className="flex flex-col gap-4">
          {getAvailableComponents().slice(4).map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component.id)}
              className={`
                relative w-24 h-12 flex items-center justify-center text-xs text-center cursor-move
                bg-gradient-to-bl from-primary/20 to-primary/40 border border-primary/30
                transition-all duration-200 hover:border-primary hover:shadow-lg
                ${draggedItem === component.id ? 'opacity-50' : ''}
              `}
              style={{
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                transform: 'rotate(10deg)'
              }}
            >
              <span className="text-primary-foreground font-mono">{component.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {gameCompleted && (
        <div className="text-center mt-6">
          {isSuccess ? (
            <p className="text-green-400 text-lg font-mono">
              ✅ Nice job! That's the brain of an AI model.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-red-400 text-lg font-mono">
                ❌ Hmm... not quite. Try again!
              </p>
              <button
                onClick={reset}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 font-mono text-sm"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrainMiniGame;
import React, { useState, useRef } from 'react';
// Removed image import - using SVG instead

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

        {/* Center brain - SVG version */}
        <div className="relative flex-shrink-0">
          {/* SVG Brain with 4 sections */}
          <svg width="256" height="256" viewBox="0 0 256 256" className="w-64 h-64">
            {/* Brain outline with 4 sections */}
            <g stroke="#64748b" strokeWidth="2" fill="none">
              {/* Main brain outline */}
              <path d="M128 20 C180 20, 220 50, 230 100 C235 130, 225 160, 210 180 C200 200, 180 220, 150 230 C130 235, 100 235, 80 230 C50 220, 30 200, 20 180 C5 160, -5 130, 0 100 C10 50, 50 20, 128 20 Z" />
              
              {/* Top-left section details */}
              <path d="M40 80 C50 75, 60 80, 70 75 M45 95 C55 90, 65 95, 75 90 M50 110 C60 105, 70 110, 80 105" />
              <path d="M60 60 C70 65, 80 60, 90 65 M65 125 C75 120, 85 125, 95 120" />
              
              {/* Top-right section details */}
              <path d="M160 75 C170 80, 180 75, 190 80 M165 90 C175 95, 185 90, 195 95 M170 105 C180 110, 190 105, 200 110" />
              <path d="M180 60 C190 65, 200 60, 210 65 M185 120 C195 125, 205 120, 215 125" />
              
              {/* Bottom-left section details */}
              <path d="M40 140 C50 145, 60 140, 70 145 M45 155 C55 160, 65 155, 75 160 M50 170 C60 175, 70 170, 80 175" />
              <path d="M60 185 C70 180, 80 185, 90 180 M65 200 C75 195, 85 200, 95 195" />
              
              {/* Bottom-right section details */}
              <path d="M160 145 C170 140, 180 145, 190 140 M165 160 C175 155, 185 160, 195 155 M170 175 C180 170, 190 175, 200 170" />
              <path d="M180 195 C190 200, 200 195, 210 200 M185 180 C195 185, 205 180, 215 185" />
              
              {/* Central division lines */}
              <line x1="128" y1="30" x2="128" y2="220" strokeWidth="1" opacity="0.7" />
              <line x1="40" y1="128" x2="216" y2="128" strokeWidth="1" opacity="0.7" />
            </g>
          </svg>
          
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
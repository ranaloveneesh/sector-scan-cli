import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import aiBrainImage from '@/assets/ai-brain.png';

interface DroppedComponent {
  id: string;
  name: string;
  slot: string;
}

interface GameComponent {
  id: string;
  name: string;
  isCorrect: boolean;
  correctSlot: string;
}

const gameComponents: GameComponent[] = [
  { id: 'training-data', name: 'Training Data', isCorrect: true, correctSlot: 'top-left' },
  { id: 'algorithm', name: 'Algorithm', isCorrect: true, correctSlot: 'top-right' },
  { id: 'weights', name: 'Weights', isCorrect: true, correctSlot: 'bottom-left' },
  { id: 'inference', name: 'Inference', isCorrect: true, correctSlot: 'bottom-right' },
  { id: 'dashboard', name: 'Dashboard', isCorrect: false, correctSlot: '' },
  { id: 'cloud-access', name: 'Cloud Access', isCorrect: false, correctSlot: '' },
  { id: 'prompt', name: 'Prompt', isCorrect: false, correctSlot: '' },
  { id: 'ui-design', name: 'UI Design', isCorrect: false, correctSlot: '' },
];

export const AIBrainGame = ({ onComplete }: { onComplete: () => void }) => {
  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dragCounter = useRef(0);

  const getSlotPosition = (slot: string) => {
    switch (slot) {
      case 'top-left': return { top: '25%', left: '25%' };
      case 'top-right': return { top: '25%', right: '25%' };
      case 'bottom-left': return { bottom: '25%', left: '25%' };
      case 'bottom-right': return { bottom: '25%', right: '25%' };
      default: return { top: '50%', left: '50%' };
    }
  };

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    setDraggedItem(componentId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
  };

  const handleDrop = (e: React.DragEvent, slot: string) => {
    e.preventDefault();
    dragCounter.current = 0;
    
    if (!draggedItem) return;

    // Remove if component already exists in any slot
    const updatedComponents = droppedComponents.filter(comp => comp.id !== draggedItem);
    
    const component = gameComponents.find(comp => comp.id === draggedItem);
    if (component) {
      const newDroppedComponents = [
        ...updatedComponents,
        { id: draggedItem, name: component.name, slot }
      ];
      
      setDroppedComponents(newDroppedComponents);
      
      // Check if game is complete (4 components placed)
      if (newDroppedComponents.length === 4) {
        checkGameCompletion(newDroppedComponents);
      }
    }
  };

  const checkGameCompletion = (components: DroppedComponent[]) => {
    const allCorrect = components.every(dropped => {
      const component = gameComponents.find(comp => comp.id === dropped.id);
      return component?.isCorrect && component.correctSlot === dropped.slot;
    });

    setIsSuccess(allCorrect);
    setShowFeedback(true);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setDroppedComponents([]);
    setGameCompleted(false);
    setShowFeedback(false);
    setIsSuccess(false);
  };

  const getAvailableComponents = () => {
    return gameComponents.filter(comp => 
      !droppedComponents.some(dropped => dropped.id === comp.id)
    );
  };

  const isSlotOccupied = (slot: string) => {
    return droppedComponents.some(comp => comp.slot === slot);
  };

  const getSlotComponent = (slot: string) => {
    return droppedComponents.find(comp => comp.slot === slot);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Question Text */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Drag the 4 real components of an AI model into the brain.
        </h2>
      </div>

      {/* Brain Container */}
      <div className="relative mx-auto" style={{ width: '600px', height: '450px' }}>
        <img 
          src={aiBrainImage} 
          alt="AI Brain" 
          className="w-full h-full object-contain"
        />
        
        {/* Drop Slots */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(slot => {
          const slotComponent = getSlotComponent(slot);
          const position = getSlotPosition(slot);
          
          return (
            <div
              key={slot}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-lg border-2 border-dashed transition-all duration-300 flex items-center justify-center text-xs font-semibold text-center
                ${isSlotOccupied(slot) 
                  ? 'border-primary bg-primary/20 text-primary' 
                  : 'border-muted-foreground/30 hover:border-primary/50'
                }
                ${draggedItem && !isSlotOccupied(slot) ? 'border-primary bg-primary/10 animate-pulse' : ''}
              `}
              style={position}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, slot)}
            >
              {slotComponent ? (
                <span className="px-2">{slotComponent.name}</span>
              ) : (
                <span className="text-muted-foreground">Drop here</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Draggable Components */}
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {getAvailableComponents().map(component => (
          <div
            key={component.id}
            draggable
            onDragStart={(e) => handleDragStart(e, component.id)}
            onDragEnd={handleDragEnd}
            className={`p-4 rounded-lg border-2 border-border bg-card cursor-move transition-all duration-200 text-center font-medium hover:shadow-lg hover:scale-105
              ${draggedItem === component.id ? 'opacity-50 scale-95' : ''}
            `}
          >
            {component.name}
          </div>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="text-center space-y-4">
          <div className={`text-lg font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {isSuccess 
              ? "Nice job! That's the brain of an AI model." 
              : "Hmm... not quite. Try again!"
            }
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={resetGame} variant="outline">
              Reset
            </Button>
            {isSuccess && (
              <Button onClick={onComplete}>
                Continue
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
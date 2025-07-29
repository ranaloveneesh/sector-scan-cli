import React, { useState } from 'react';

interface Component {
  id: string;
  name: string;
  isCorrect: boolean;
}

const components: Component[] = [
  { id: 'training-data', name: 'Training Data', isCorrect: true },
  { id: 'algorithm', name: 'Algorithm', isCorrect: true },
  { id: 'weights', name: 'Weights', isCorrect: true },
  { id: 'inference', name: 'Inference', isCorrect: true },
  { id: 'dashboard', name: 'Dashboard', isCorrect: false },
  { id: 'cloud-access', name: 'Cloud Access', isCorrect: false },
  { id: 'prompt', name: 'Prompt', isCorrect: false },
  { id: 'ui-design', name: 'UI Design', isCorrect: false },
];

interface AIModelBuilderProps {
  onGameComplete: (success: boolean) => void;
}

const AIModelBuilder: React.FC<AIModelBuilderProps> = ({ onGameComplete }) => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleComponentClick = (componentId: string) => {
    if (gameCompleted) return;

    let newSelected;
    if (selectedComponents.includes(componentId)) {
      // Deselect
      newSelected = selectedComponents.filter(id => id !== componentId);
    } else if (selectedComponents.length < 4) {
      // Select (max 4)
      newSelected = [...selectedComponents, componentId];
    } else {
      // Already have 4 selected, replace oldest
      newSelected = [...selectedComponents.slice(1), componentId];
    }

    setSelectedComponents(newSelected);

    // Check if we have exactly 4 selected
    if (newSelected.length === 4) {
      checkCompletion(newSelected);
    }
  };

  const checkCompletion = (selected: string[]) => {
    const correctComponents = components.filter(c => c.isCorrect).map(c => c.id);
    const isCorrect = selected.length === 4 && 
                     selected.every(id => correctComponents.includes(id)) &&
                     correctComponents.every(id => selected.includes(id));

    setIsSuccess(isCorrect);
    setGameCompleted(true);
    onGameComplete(isCorrect);
  };

  const reset = () => {
    setSelectedComponents([]);
    setGameCompleted(false);
    setIsSuccess(false);
  };

  const getComponentStatus = (component: Component) => {
    const isSelected = selectedComponents.includes(component.id);
    
    if (!gameCompleted) {
      return isSelected ? 'selected' : 'default';
    }
    
    if (isSelected) {
      return component.isCorrect ? 'correct' : 'incorrect';
    }
    
    return component.isCorrect ? 'missed' : 'default';
  };

  const getComponentStyles = (status: string) => {
    switch (status) {
      case 'selected':
        return 'bg-primary/20 border-primary text-primary shadow-lg scale-105';
      case 'correct':
        return 'bg-green-500/20 border-green-400 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.5)]';
      case 'incorrect':
        return 'bg-red-500/20 border-red-400 text-red-300';
      case 'missed':
        return 'bg-yellow-500/10 border-yellow-400 text-yellow-300';
      default:
        return 'bg-card/50 border-muted-foreground/30 text-foreground hover:border-primary/50 hover:bg-primary/5';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Instructions */}
      <div className="text-center">
        <p className="text-terminal-green font-mono text-lg mb-2">
          Select the 4 real components of an AI model
        </p>
        <p className="text-muted-foreground text-sm font-mono">
          {selectedComponents.length}/4 selected
        </p>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {components.map((component) => {
          const status = getComponentStatus(component);
          return (
            <button
              key={component.id}
              onClick={() => handleComponentClick(component.id)}
              disabled={gameCompleted}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-300 
                font-mono text-sm text-center min-h-[80px] flex items-center justify-center
                ${getComponentStyles(status)}
                ${gameCompleted ? 'cursor-default' : 'cursor-pointer hover:scale-105'}
              `}
            >
              <span className="relative z-10">{component.name}</span>
              
              {/* Selection indicator */}
              {selectedComponents.includes(component.id) && !gameCompleted && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary"></div>
              )}
              
              {/* Completion indicators */}
              {gameCompleted && selectedComponents.includes(component.id) && (
                <div className={`absolute top-2 right-2 text-lg ${
                  component.isCorrect ? 'text-green-400' : 'text-red-400'
                }`}>
                  {component.isCorrect ? '✓' : '✗'}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {gameCompleted && (
        <div className="text-center space-y-4">
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
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 font-mono text-sm transition-colors"
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

export default AIModelBuilder;
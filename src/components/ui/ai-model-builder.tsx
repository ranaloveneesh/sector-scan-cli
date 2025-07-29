import React, { useState } from 'react';

interface Component {
  id: string;
  name: string;
  isCorrect: boolean;
}

const components: Component[] = [
  // Correct components
  { id: 'training-data', name: 'Data', isCorrect: true },
  { id: 'algorithm', name: 'Algorithms', isCorrect: true },
  { id: 'weights', name: 'Weights', isCorrect: true },
  { id: 'inference', name: 'Inference', isCorrect: true },
  // Distractors
  { id: 'dashboard', name: 'Dashboard', isCorrect: false },
  { id: 'cloud-access', name: 'Cloud', isCorrect: false },
  { id: 'prompt', name: 'Prompt', isCorrect: false },
  { id: 'ui-design', name: 'UI', isCorrect: false },
];

interface AIModelBuilderProps {
  onGameComplete: (success: boolean) => void;
}

const AIModelBuilder: React.FC<AIModelBuilderProps> = ({ onGameComplete }) => {
  const [availableComponents, setAvailableComponents] = useState(components);
  const [placedComponents, setPlacedComponents] = useState<Component[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'testing' | 'success' | 'error' | 'flash'>('playing');
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);
  const [showFlash, setShowFlash] = useState(false);

  const handleDragStart = (component: Component) => {
    if (gameState !== 'playing') return;
    setDraggedComponent(component);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponent || placedComponents.length >= 4) return;

    setPlacedComponents(prev => [...prev, draggedComponent]);
    setAvailableComponents(prev => prev.filter(c => c.id !== draggedComponent.id));
    setDraggedComponent(null);
  };

  const handleComponentClick = (component: Component) => {
    if (gameState !== 'playing') return;
    
    if (placedComponents.find(c => c.id === component.id)) {
      // Remove from reactor
      setPlacedComponents(prev => prev.filter(c => c.id !== component.id));
      setAvailableComponents(prev => [...prev, component]);
    } else if (placedComponents.length < 4) {
      // Add to reactor
      setPlacedComponents(prev => [...prev, component]);
      setAvailableComponents(prev => prev.filter(c => c.id !== component.id));
    }
  };

  const handleTest = () => {
    if (placedComponents.length !== 4) return;
    
    setGameState('testing');
    
    setTimeout(() => {
      const correctComponents = components.filter(c => c.isCorrect);
      const isCorrect = placedComponents.every(placed => 
        correctComponents.some(correct => correct.id === placed.id)
      ) && placedComponents.length === 4;
      
      if (isCorrect) {
        setGameState('success');
        onGameComplete(true);
      } else {
        setShowFlash(true);
        setGameState('flash');
        setTimeout(() => {
          setShowFlash(false);
          setGameState('error');
        }, 200);
      }
    }, 1000);
  };

  const handleReset = () => {
    setAvailableComponents(components);
    setPlacedComponents([]);
    setGameState('playing');
    setShowFlash(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Instructions */}
      <div className="text-center">
        <p className="text-[#5CE1E6] font-mono text-lg mb-2">
          Drag 4 core components into the reactor to power it up
        </p>
        <p className="text-slate-400 text-sm font-mono">
          {placedComponents.length}/4 components placed
        </p>
      </div>

      <div className="flex gap-8 items-center justify-center">
        {/* Available Components */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[#5CE1E6] font-mono text-sm text-center mb-2">Available Components</h3>
          {availableComponents.map((component) => (
            <button
              key={component.id}
              draggable={gameState === 'playing'}
              onDragStart={() => handleDragStart(component)}
              onClick={() => handleComponentClick(component)}
              className={`
                w-24 h-24 rounded-lg border-2 font-mono text-xs 
                flex items-center justify-center transition-all duration-300
                cursor-pointer hover:scale-105
                ${gameState === 'error' && component.isCorrect ? 
                  'bg-yellow-500/10 border-yellow-400 text-yellow-300' : 
                  'bg-slate-800/80 border-slate-500 text-white hover:border-[#5CE1E6]/50 hover:bg-[#5CE1E6]/10'
                }
              `}
            >
              {component.name}
            </button>
          ))}
        </div>

        {/* Arc Reactor */}
        <div className="relative">
          {/* Flash Effect */}
          {showFlash && (
            <div className="absolute inset-0 bg-white rounded-full animate-ping z-30" />
          )}
          
          <div className="relative w-80 h-80">
            <svg 
              viewBox="0 0 320 320" 
              className="absolute inset-0 w-full h-full z-10"
              style={{ filter: gameState === 'success' ? 'drop-shadow(0 0 30px #5CE1E6)' : '' }}
            >
              {/* Outer Grid Pattern */}
              {gameState === 'success' && (
                <>
                  {/* Outer Ring Segments */}
                  {Array.from({ length: 16 }, (_, i) => {
                    const angle = (i / 16) * 360;
                    const isActive = i % 2 === 0;
                    return (
                      <rect
                        key={i}
                        x="140"
                        y="10"
                        width="40"
                        height="15"
                        fill={isActive ? "#5CE1E6" : "#5CE1E6"}
                        opacity={isActive ? "0.9" : "0.6"}
                        transform={`rotate(${angle} 160 160)`}
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    );
                  })}
                  
                  {/* Middle Ring Segments */}
                  {Array.from({ length: 12 }, (_, i) => {
                    const angle = (i / 12) * 360;
                    return (
                      <rect
                        key={i}
                        x="145"
                        y="40"
                        width="30"
                        height="12"
                        fill="#5CE1E6"
                        opacity="0.7"
                        transform={`rotate(${angle} 160 160)`}
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    );
                  })}
                </>
              )}
              
              {/* Static Reactor Structure */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="#5CE1E6"
                strokeWidth="2"
                opacity="0.3"
              />
              
              <circle
                cx="160"
                cy="160"
                r="100"
                fill="none"
                stroke="#5CE1E6"
                strokeWidth="1"
                opacity="0.4"
              />
              
              {/* Drop Zone */}
              <circle
                cx="160"
                cy="160"
                r="60"
                fill={placedComponents.length > 0 ? "#5CE1E6" : "none"}
                fillOpacity={placedComponents.length > 0 ? "0.1" : "0"}
                stroke="#5CE1E6"
                strokeWidth="2"
                strokeDasharray={placedComponents.length === 4 ? "none" : "10 5"}
                opacity="0.6"
              />
              
              {/* Core */}
              <circle
                cx="160"
                cy="160"
                r="25"
                fill={gameState === 'success' ? '#5CE1E6' : 'none'}
                stroke="#5CE1E6"
                strokeWidth="2"
                opacity={gameState === 'success' ? '0.8' : '0.4'}
              />
              
              {/* Energy Pulses on Success */}
              {gameState === 'success' && (
                <>
                  <circle
                    cx="160"
                    cy="160"
                    r="80"
                    fill="none"
                    stroke="#5CE1E6"
                    strokeWidth="3"
                    strokeDasharray="20 10"
                    opacity="0.6"
                    className="animate-spin"
                    style={{ animationDuration: '3s' }}
                  />
                  
                  <circle
                    cx="160"
                    cy="160"
                    r="120"
                    fill="none"
                    stroke="#5CE1E6"
                    strokeWidth="2"
                    strokeDasharray="15 8"
                    opacity="0.4"
                    className="animate-spin"
                    style={{ animationDuration: '4s', animationDirection: 'reverse' }}
                  />
                </>
              )}
            </svg>
            
            {/* Drop Zone Overlay */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="absolute inset-0 rounded-full flex items-center justify-center z-20"
            >
              {/* Placed Components in Center */}
              <div className="grid grid-cols-2 gap-2 w-20 h-20">
                {Array.from({ length: 4 }, (_, i) => {
                  const component = placedComponents[i];
                  return (
                    <div
                      key={i}
                      onClick={() => component && handleComponentClick(component)}
                      className={`
                        w-8 h-8 rounded border text-xs flex items-center justify-center
                        cursor-pointer transition-all duration-300 font-mono
                        ${component ? 
                          `${gameState === 'success' ? 'bg-[#5CE1E6]/20 border-[#5CE1E6] text-[#5CE1E6]' : 
                            gameState === 'error' ? 
                              (component.isCorrect ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-red-500/20 border-red-400 text-red-300') :
                              'bg-slate-700 border-slate-500 text-white hover:border-[#5CE1E6]'
                          }` :
                          'border-dashed border-slate-600 text-slate-600'
                        }
                      `}
                    >
                      {component ? component.name.slice(0, 3) : '?'}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Placed Components List */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[#5CE1E6] font-mono text-sm text-center mb-2">In Reactor</h3>
          {Array.from({ length: 4 }, (_, i) => {
            const component = placedComponents[i];
            return (
              <div
                key={i}
                onClick={() => component && handleComponentClick(component)}
                className={`
                  w-24 h-16 rounded border text-xs flex items-center justify-center
                  cursor-pointer transition-all duration-300 font-mono
                  ${component ? 
                    `${gameState === 'success' ? 'bg-[#5CE1E6]/20 border-[#5CE1E6] text-[#5CE1E6]' : 
                      gameState === 'error' ? 
                        (component.isCorrect ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-red-500/20 border-red-400 text-red-300') :
                        'bg-slate-700 border-slate-500 text-white hover:border-[#5CE1E6]'
                    }` :
                    'border-dashed border-slate-600 text-slate-600'
                  }
                `}
              >
                {component ? component.name : `Slot ${i + 1}`}
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleTest}
          disabled={placedComponents.length !== 4 || gameState === 'testing'}
          className={`
            px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300
            ${placedComponents.length === 4 && gameState === 'playing'
              ? 'bg-[#5CE1E6] text-black hover:bg-[#5CE1E6]/80 shadow-[0_0_15px_#5CE1E6]'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }
            ${gameState === 'testing' ? 'animate-pulse' : ''}
          `}
        >
          {gameState === 'testing' ? 'Testing...' : 'Test Reactor'}
        </button>
        
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-lg font-mono text-sm bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all duration-300"
        >
          Reset
        </button>
      </div>

      {/* Status Messages */}
      {gameState === 'success' && (
        <div className="text-center">
          <p className="text-[#5CE1E6] text-xl font-mono animate-pulse">
            ⚡ Reactor Online! AI Model Powered Up! ⚡
          </p>
        </div>
      )}
      
      {gameState === 'error' && (
        <div className="text-center space-y-2">
          <p className="text-red-400 text-lg font-mono">
            💥 Reactor Overload! Wrong Components!
          </p>
          <p className="text-slate-400 text-sm font-mono">
            Try different components to stabilize the reactor
          </p>
        </div>
      )}
    </div>
  );
};

export default AIModelBuilder;
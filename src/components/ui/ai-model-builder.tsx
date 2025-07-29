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
  const [gameState, setGameState] = useState<'playing' | 'testing' | 'success' | 'error' | 'flash'>('playing');
  const [showFlash, setShowFlash] = useState(false);

  const handleComponentClick = (componentId: string) => {
    if (gameState !== 'playing') return;

    let newSelected;
    if (selectedComponents.includes(componentId)) {
      newSelected = selectedComponents.filter(id => id !== componentId);
    } else if (selectedComponents.length < 4) {
      newSelected = [...selectedComponents, componentId];
    } else {
      newSelected = [...selectedComponents.slice(1), componentId];
    }

    setSelectedComponents(newSelected);
  };

  const handleTest = () => {
    if (selectedComponents.length !== 4) return;
    
    setGameState('testing');
    
    setTimeout(() => {
      const correctComponents = components.filter(c => c.isCorrect).map(c => c.id);
      const isCorrect = selectedComponents.every(id => correctComponents.includes(id)) &&
                       correctComponents.every(id => selectedComponents.includes(id));
      
      if (isCorrect) {
        setGameState('success');
        onGameComplete(true);
      } else {
        // Flash effect
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
    setSelectedComponents([]);
    setGameState('playing');
    setShowFlash(false);
  };

  const getNodePosition = (index: number) => {
    const angle = (index / 8) * 2 * Math.PI - Math.PI / 2;
    const radius = 140;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle };
  };

  const isNodeActive = (componentId: string) => {
    return selectedComponents.includes(componentId);
  };

  const getNodeStatus = (component: Component) => {
    if (gameState === 'success' || gameState === 'error') {
      if (selectedComponents.includes(component.id)) {
        return component.isCorrect ? 'correct' : 'incorrect';
      }
      return component.isCorrect ? 'missed' : 'default';
    }
    return selectedComponents.includes(component.id) ? 'selected' : 'default';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Instructions */}
      <div className="text-center">
        <p className="text-[#5CE1E6] font-mono text-lg mb-2">
          Power up the AI reactor by selecting 4 core components
        </p>
        <p className="text-slate-400 text-sm font-mono">
          {selectedComponents.length}/4 components selected
        </p>
      </div>

      {/* Arc Reactor Container */}
      <div className="relative w-full flex justify-center">
        <div className="relative w-80 h-80">
          {/* Flash Effect */}
          {showFlash && (
            <div className="absolute inset-0 bg-white rounded-full animate-ping z-30" />
          )}
          
          {/* Arc Reactor SVG */}
          <svg 
            viewBox="0 0 320 320" 
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            style={{ filter: gameState === 'success' ? 'drop-shadow(0 0 20px #5CE1E6)' : '' }}
          >
            {/* Outer Ring */}
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              stroke="#5CE1E6"
              strokeWidth="2"
              opacity="0.3"
            />
            
            {/* Middle Ring */}
            <circle
              cx="160"
              cy="160"
              r="120"
              fill="none"
              stroke="#5CE1E6"
              strokeWidth="1"
              opacity="0.5"
            />
            
            {/* Inner Ring */}
            <circle
              cx="160"
              cy="160"
              r="80"
              fill="none"
              stroke="#5CE1E6"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* Core */}
            <circle
              cx="160"
              cy="160"
              r="30"
              fill={gameState === 'success' ? '#5CE1E6' : 'none'}
              stroke="#5CE1E6"
              strokeWidth="2"
              opacity={gameState === 'success' ? '0.8' : '0.4'}
            />
            
            {/* Energy Flow Lines - only visible on success */}
            {gameState === 'success' && (
              <>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <g key={angle}>
                    <line
                      x1="160"
                      y1="160"
                      x2={160 + Math.cos((angle * Math.PI) / 180) * 70}
                      y2={160 + Math.sin((angle * Math.PI) / 180) * 70}
                      stroke="#5CE1E6"
                      strokeWidth="2"
                      opacity="0.8"
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  </g>
                ))}
                
                {/* Rotating Energy Ring */}
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#5CE1E6"
                  strokeWidth="3"
                  strokeDasharray="20 10"
                  opacity="0.6"
                  className="animate-spin"
                  style={{ animationDuration: '3s' }}
                />
              </>
            )}
          </svg>
          
          {/* Component Nodes */}
          {components.map((component, index) => {
            const { x, y } = getNodePosition(index);
            const status = getNodeStatus(component);
            
            return (
              <button
                key={component.id}
                onClick={() => handleComponentClick(component.id)}
                disabled={gameState !== 'playing'}
                className={`
                  absolute w-20 h-20 rounded-full border-2 font-mono text-xs 
                  flex items-center justify-center transition-all duration-300
                  transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto
                  ${status === 'selected' ? 'bg-[#5CE1E6]/20 border-[#5CE1E6] text-[#5CE1E6] scale-110 shadow-[0_0_15px_#5CE1E6]' : ''}
                  ${status === 'correct' ? 'bg-green-500/20 border-green-400 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : ''}
                  ${status === 'incorrect' ? 'bg-red-500/20 border-red-400 text-red-300' : ''}
                  ${status === 'missed' ? 'bg-yellow-500/10 border-yellow-400 text-yellow-300' : ''}
                  ${status === 'default' ? 'bg-slate-800/80 border-slate-500 text-white hover:border-[#5CE1E6]/50 hover:bg-[#5CE1E6]/10' : ''}
                  ${gameState === 'playing' ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                `}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <span className="text-center leading-tight px-1 text-xs font-semibold">
                  {component.name.length > 8 ? 
                    component.name.split(' ').map(word => word.slice(0, 4)).join('\n') :
                    component.name
                  }
                </span>
                
                {/* Connection line to center when selected */}
                {isNodeActive(component.id) && gameState === 'success' && (
                  <div
                    className="absolute bg-[#5CE1E6] opacity-60 animate-pulse"
                    style={{
                      width: '2px',
                      height: `${Math.sqrt(x * x + y * y)}px`,
                      transformOrigin: 'bottom',
                      transform: `rotate(${Math.atan2(y, x) * 180 / Math.PI + 90}deg)`,
                      bottom: '50%',
                      left: '50%',
                      marginLeft: '-1px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleTest}
          disabled={selectedComponents.length !== 4 || gameState === 'testing'}
          className={`
            px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300
            ${selectedComponents.length === 4 && gameState === 'playing'
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
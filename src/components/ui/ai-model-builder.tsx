import React, { useState } from 'react';
interface Component {
  id: string;
  name: string;
  isCorrect: boolean;
}
const components: Component[] = [
// Correct components
{
  id: 'training-data',
  name: 'Data',
  isCorrect: true
}, {
  id: 'algorithm',
  name: 'Algorithms',
  isCorrect: true
}, {
  id: 'weights',
  name: 'Weights',
  isCorrect: true
}, {
  id: 'inference',
  name: 'Inference',
  isCorrect: true
},
// Distractors
{
  id: 'dashboard',
  name: 'Dashboard',
  isCorrect: false
}, {
  id: 'cloud-access',
  name: 'Cloud',
  isCorrect: false
}, {
  id: 'prompt',
  name: 'Prompt',
  isCorrect: false
}, {
  id: 'ui-design',
  name: 'UI',
  isCorrect: false
}];
interface AIModelBuilderProps {
  onGameComplete: (success: boolean) => void;
}
const AIModelBuilder: React.FC<AIModelBuilderProps> = ({
  onGameComplete
}) => {
  const [availableComponents, setAvailableComponents] = useState(components);
  const [placedComponents, setPlacedComponents] = useState<Component[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'testing' | 'success' | 'error' | 'flash'>('playing');
  const [showFlash, setShowFlash] = useState(false);
  const handleComponentClick = (component: Component) => {
    console.log('Component clicked:', component.name, 'Game state:', gameState);
    if (gameState !== 'playing') {
      console.log('Game not in playing state, ignoring click');
      return;
    }
    const isInReactor = placedComponents.find(c => c.id === component.id);
    const isAvailable = availableComponents.find(c => c.id === component.id);
    if (isInReactor) {
      // Remove from reactor, add back to available
      console.log('Removing from reactor:', component.name);
      setPlacedComponents(prev => prev.filter(c => c.id !== component.id));
      setAvailableComponents(prev => [...prev, component]);
    } else if (isAvailable && placedComponents.length < 4) {
      // Add to reactor, remove from available
      console.log('Adding to reactor:', component.name);
      setPlacedComponents(prev => [...prev, component]);
      setAvailableComponents(prev => prev.filter(c => c.id !== component.id));
    } else {
      console.log('Cannot move component - reactor full or component not available');
    }
  };
  const handleTest = () => {
    console.log('Test button clicked, placed components:', placedComponents.length);
    if (placedComponents.length !== 4) return;
    setGameState('testing');
    setTimeout(() => {
      const correctComponents = components.filter(c => c.isCorrect);
      const isCorrect = placedComponents.every(placed => correctComponents.some(correct => correct.id === placed.id)) && placedComponents.length === 4;
      console.log('Test result:', isCorrect);
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
    console.log('Reset clicked');
    setAvailableComponents(components);
    setPlacedComponents([]);
    setGameState('playing');
    setShowFlash(false);
  };
  return <div className="w-full h-full flex flex-col justify-center items-center space-y-4 md:space-y-6">
      <style>{`
        @keyframes custom-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
      
      {/* Instructions */}
      <div className="text-center px-4">
        <p className="text-white font-mono text-xs md:text-sm lg:text-base mb-0 leading-tight">
          Guess the 4 right components of an AI model. Then test it, and see if you are correct
        </p>
      </div>

      <div className="w-full flex flex-col space-y-4 md:space-y-6 max-w-6xl">
        
        {/* Mobile Layout - Stack Vertically */}
        <div className="block md:hidden">
          
          {/* Available Components - Mobile */}
          <div className="bg-slate-900 p-3 rounded-lg mb-4">
            <h3 className="text-[#5CE1E6] font-mono text-xs text-center mb-3">Available Components</h3>
            <div className="grid grid-cols-4 gap-2">
              {availableComponents.map(component => 
                <button 
                  key={component.id} 
                  type="button" 
                  onClick={() => handleComponentClick(component)}
                  className="w-full h-10 rounded border-2 border-slate-500 bg-slate-800 text-white font-mono text-xs flex items-center justify-center hover:bg-slate-700 hover:border-[#5CE1E6] cursor-pointer transition-all duration-200"
                >
                  {component.name}
                </button>
              )}
            </div>
          </div>

          {/* Arc Reactor - Mobile */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 384 384" className="absolute inset-0 w-full h-full z-10" style={{
                filter: gameState === 'success' ? 'drop-shadow(0 0 20px #5CE1E6)' : 'none',
                animation: gameState === 'success' ? 'custom-pulse 1s ease-in-out infinite' : 'none'
              }}>
                {/* Flash Effect */}
                {showFlash && <circle cx="192" cy="192" r="150" fill="white" opacity="0.8" className="animate-ping" />}
                
                <defs>
                  <radialGradient id="metalGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5CE1E6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#5CE1E6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#5CE1E6" stopOpacity="0.1" />
                  </radialGradient>
                </defs>

                <circle cx="192" cy="192" r="140" fill="none" stroke="#5CE1E6" strokeWidth="3" opacity="0.6" />
                <circle cx="192" cy="192" r="110" fill="none" stroke="#5CE1E6" strokeWidth="2" opacity="0.4" />
                <circle cx="192" cy="192" r="60" fill={placedComponents.length > 0 ? "url(#metalGradient)" : "none"} stroke="#5CE1E6" strokeWidth="2" strokeDasharray={placedComponents.length === 4 ? "none" : "6 3"} opacity="0.6" />
              </svg>
              
              {/* Placed Components in Center - Mobile */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="grid grid-cols-2 gap-1 w-12 h-12">
                  {Array.from({ length: 4 }, (_, i) => {
                    const component = placedComponents[i];
                    return (
                      <div 
                        key={i} 
                        onClick={() => component && handleComponentClick(component)}
                        className={`w-6 h-6 rounded border text-xs flex items-center justify-center cursor-pointer font-mono
                          ${component ? 
                            gameState === 'success' ? 'border-[#5CE1E6] text-[#5CE1E6]' : 
                            gameState === 'error' ? 
                              component.isCorrect ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-red-500/20 border-red-400 text-red-300'
                              : 'bg-slate-700 border-slate-500 text-white hover:border-[#5CE1E6]'
                            : 'border-dashed border-slate-600 text-slate-600'
                          }`}
                      >
                        {component ? component.name.slice(0, 1) : '?'}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Control Buttons - Mobile */}
            <div className="flex justify-center gap-2 mt-3">
              <button 
                onClick={handleTest} 
                disabled={placedComponents.length !== 4 || gameState === 'testing'}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all duration-300
                  ${placedComponents.length === 4 && gameState === 'playing' ? 
                    'bg-[#5CE1E6] text-black hover:bg-[#5CE1E6]/80' : 
                    'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }
                  ${gameState === 'testing' ? 'animate-pulse' : ''}
                `}
              >
                {gameState === 'testing' ? 'Testing...' : 'Test'}
              </button>
              
              <button 
                onClick={handleReset} 
                className="px-4 py-2 rounded-lg font-mono text-xs bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Placed Components List - Mobile */}
          <div className="bg-slate-900 p-3 rounded-lg">
            <h3 className="text-[#5CE1E6] font-mono text-xs text-center mb-3">In the model</h3>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }, (_, i) => {
                const component = placedComponents[i];
                return (
                  <div 
                    key={i} 
                    onClick={() => component && handleComponentClick(component)}
                    className={`h-10 rounded border text-xs flex items-center justify-center cursor-pointer font-mono
                      ${component ? 
                        gameState === 'success' ? 'border-[#5CE1E6] text-[#5CE1E6]' : 
                        gameState === 'error' ? 
                          component.isCorrect ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-red-500/20 border-red-400 text-red-300'
                          : 'bg-slate-700 border-slate-500 text-white hover:border-[#5CE1E6]'
                        : 'border-dashed border-slate-600 text-slate-600'
                      }`}
                  >
                    {component ? component.name : `Slot ${i + 1}`}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden md:flex gap-8 lg:gap-12 items-center justify-center">
          
          {/* Available Components - Desktop */}
          <div className="bg-slate-900 p-4 rounded-lg">
            <h3 className="text-[#5CE1E6] font-mono text-sm text-center mb-4">Available Components</h3>
            <div className="grid grid-cols-2 gap-4 max-w-xs">
              {availableComponents.map(component => 
                <button 
                  key={component.id} 
                  type="button" 
                  onClick={() => handleComponentClick(component)}
                  className="w-24 h-16 rounded-lg border-2 border-slate-500 bg-slate-800 text-white font-mono text-xs flex items-center justify-center hover:bg-slate-700 hover:border-[#5CE1E6] cursor-pointer transition-all duration-200"
                >
                  {component.name}
                </button>
              )}
            </div>
          </div>

          {/* Arc Reactor - Desktop */}
          <div className="relative flex flex-col items-center">
            <div className="relative">
              {showFlash && <div className="absolute inset-0 bg-white rounded-full animate-ping z-30" />}
              
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <svg viewBox="0 0 384 384" className="absolute inset-0 w-full h-full z-10" style={{
                  filter: gameState === 'success' ? 'drop-shadow(0 0 30px #5CE1E6) drop-shadow(0 0 60px #5CE1E6)' : 'none',
                  animation: gameState === 'success' ? 'custom-pulse 1s ease-in-out infinite' : 'none'
                }}>
                  <defs>
                    <radialGradient id="metalGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#5CE1E6" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#5CE1E6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#5CE1E6" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>

                  <circle cx="192" cy="192" r="168" fill="none" stroke="#5CE1E6" strokeWidth="4" opacity="0.6" />
                  <circle cx="192" cy="192" r="140" fill="none" stroke="#5CE1E6" strokeWidth="1" opacity="0.3" />
                  <circle cx="192" cy="192" r="110" fill="none" stroke="#5CE1E6" strokeWidth="1" opacity="0.4" />
                  <circle cx="192" cy="192" r="72" fill={placedComponents.length > 0 ? "url(#metalGradient)" : "none"} stroke="#5CE1E6" strokeWidth="2" strokeDasharray={placedComponents.length === 4 ? "none" : "8 4"} opacity="0.6" />
                </svg>
                
                {/* Placed Components in Center - Desktop */}
                <div className="absolute inset-0 rounded-full flex items-center justify-center z-20">
                  <div className="grid grid-cols-2 gap-0 w-20 h-20 lg:w-24 lg:h-24 place-items-center">
                    {Array.from({ length: 4 }, (_, i) => {
                      const component = placedComponents[i];
                      return (
                        <div 
                          key={i} 
                          onClick={() => component && handleComponentClick(component)}
                          className={`w-10 h-10 lg:w-12 lg:h-12 rounded border text-xs flex items-center justify-center cursor-pointer font-mono
                            ${component ? 
                              gameState === 'success' ? 'border-[#5CE1E6] text-[#5CE1E6]' : 
                              gameState === 'error' ? 
                                component.isCorrect ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-red-500/20 border-red-400 text-red-300'
                                : 'bg-slate-700 border-slate-500 text-white hover:border-[#5CE1E6]'
                              : 'border-dashed border-slate-600 text-slate-600'
                            }`}
                        >
                          {component ? component.name.slice(0, 3) : '?'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons - Desktop */}
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={handleTest} 
                disabled={placedComponents.length !== 4 || gameState === 'testing'}
                className={`px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300
                  ${placedComponents.length === 4 && gameState === 'playing' ? 
                    'bg-[#5CE1E6] text-black hover:bg-[#5CE1E6]/80 shadow-[0_0_15px_#5CE1E6]' : 
                    'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }
                  ${gameState === 'testing' ? 'animate-pulse' : ''}
                `}
              >
                {gameState === 'testing' ? 'Testing...' : 'Test Model'}
              </button>
              
              <button 
                onClick={handleReset} 
                className="px-6 py-2 rounded-lg font-mono text-sm bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Placed Components List - Desktop */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#5CE1E6] font-mono text-sm text-center mb-2">In the model</h3>
            {Array.from({ length: 4 }, (_, i) => {
              const component = placedComponents[i];
              return (
                <div 
                  key={i} 
                  onClick={() => component && handleComponentClick(component)}
                  className={`w-20 h-12 rounded border text-xs flex items-center justify-center cursor-pointer font-mono hover:border-[#5CE1E6] hover:bg-[#5CE1E6]/10
                    ${component ? 
                      gameState === 'success' ? 'border-[#5CE1E6] text-[#5CE1E6] shadow-[0_0_10px_#5CE1E6]' : 
                      gameState === 'error' ? 
                        component.isCorrect ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-red-500/20 border-red-400 text-red-300'
                        : 'bg-slate-700 border-slate-500 text-white hover:border-[#5CE1E6]'
                      : 'border-dashed border-slate-600 text-slate-600'
                    }`}
                >
                  {component ? component.name : `Slot ${i + 1}`}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>;
};
export default AIModelBuilder;
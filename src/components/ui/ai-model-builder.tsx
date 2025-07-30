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
  return <div className="w-full max-w-6xl mx-auto space-y-3 px-2 md:px-4">
      <style>{`
        @keyframes custom-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
      {/* Instructions */}
      <div className="text-center">
        <p className="text-white font-mono text-sm md:text-base lg:text-lg mb-0 py-[10px] px-2">
          Guess the 4 right components of an AI model. Then test it, and see if you are correct
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 xl:gap-12 items-center justify-center mt-8 md:mt-16 lg:mt-32 xl:mt-48">
        {/* Available Components */}
        <div className="bg-slate-900 p-3 md:p-4 rounded-lg w-full max-w-xs lg:max-w-none lg:w-auto order-3 lg:order-1">
          <h3 className="text-[#5CE1E6] font-mono text-xs md:text-sm text-center mb-3 md:mb-4">Available Components</h3>
          <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
            {availableComponents.map(component => <button key={component.id} type="button" onClick={() => {
            console.log('COMPONENT BUTTON CLICKED:', component.name);
            handleComponentClick(component);
          }} onMouseEnter={() => console.log('Mouse entered:', component.name)} className="w-20 h-12 md:w-24 md:h-16 rounded-lg border-2 border-slate-500 bg-slate-800 text-white font-mono text-xs flex items-center justify-center hover:bg-slate-700 hover:border-[#5CE1E6] cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5CE1E6]">
                {component.name}
              </button>)}
          </div>
        </div>

        {/* Arc Reactor */}
        <div className="relative flex flex-col items-center order-1 lg:order-2">
          <div className="relative">
            {/* Flash Effect */}
            {showFlash && <div className="absolute inset-0 bg-white rounded-full animate-ping z-30" />}
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
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
                  <linearGradient id="segmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5CE1E6" stopOpacity="1" />
                    <stop offset="30%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#5CE1E6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="outerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5CE1E6" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#5CE1E6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                <circle cx="192" cy="192" r="168" fill="none" stroke={gameState === 'success' ? "#5CE1E6" : "#5CE1E6"} strokeWidth="4" opacity={gameState === 'success' ? "1" : "0.6"} />

                {Array.from({
                length: 20
              }, (_, i) => {
                const angle = i / 20 * 360;
                const isPrimarySegment = i % 4 === 0;
                const isSecondarySegment = i % 2 === 0 && !isPrimarySegment;
                const isActive = gameState === 'success';
                return <g key={`outer-${i}`}>
                      <rect x={isPrimarySegment ? "172" : isSecondarySegment ? "175" : "178"} y="14" width={isPrimarySegment ? "40" : isSecondarySegment ? "34" : "28"} height={isPrimarySegment ? "68" : isSecondarySegment ? "55" : "38"} fill={isActive ? "url(#segmentGradient)" : "#5CE1E6"} opacity={isActive ? isPrimarySegment ? "1" : isSecondarySegment ? "0.8" : "0.6" : "0.3"} transform={`rotate(${angle} 192 192)`} />
                    </g>;
              })}

                {/* Middle Ring Structure */}
                <circle cx="192" cy="192" r="140" fill="none" stroke="#5CE1E6" strokeWidth="1" opacity={gameState === 'success' ? "0.6" : "0.3"} />
                <circle cx="192" cy="192" r="110" fill="none" stroke="#5CE1E6" strokeWidth="1" opacity={gameState === 'success' ? "0.7" : "0.4"} />
                
                {/* Reactor Core Details - Between outer ring and center */}
                {Array.from({
                length: 8
              }, (_, i) => {
                const angle = i / 8 * 360;
                return <g key={`mid-${i}`}>
                      {/* Outer radial segments - outside dotted circle */}
                      <rect x="188" y="80" width="8" height="32" fill="#5CE1E6" opacity={gameState === 'success' ? "0.8" : "0.5"} transform={`rotate(${angle} 192 192)`} />
                    </g>;
              })}

                {/* Central Drop Zone */}
                <circle cx="192" cy="192" r="72" fill={placedComponents.length > 0 ? "url(#metalGradient)" : "none"} stroke="#5CE1E6" strokeWidth="2" strokeDasharray={placedComponents.length === 4 ? "none" : "8 4"} opacity="0.6" />
               </svg>
              
              {/* Placed Components in Center */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center z-20">
                <div className="grid grid-cols-2 gap-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 place-items-center">
                  {Array.from({
                  length: 4
                }, (_, i) => {
                  const component = placedComponents[i];
                  return <div key={i} onClick={() => component && handleComponentClick(component)} className={`
                          w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded border text-xs flex items-center justify-center
                          cursor-pointer font-mono
                          ${component ? `${gameState === 'success' ? 'border-[#5CE1E6] text-[#5CE1E6]' : gameState === 'error' ? component.isCorrect ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-red-500/20 border-red-400 text-red-300' : 'bg-slate-700 border-slate-500 text-white hover:border-[#5CE1E6]'}` : 'border-dashed border-slate-600 text-slate-600'}
                        `}>
                        {component ? component.name.slice(0, 3) : '?'}
                      </div>;
                })}
                </div>
              </div>
            </div>
          </div>

          {/* Control Buttons - under reactor */}
          <div className="flex justify-center gap-2 md:gap-4 mt-4 md:mt-6">
            <button onClick={handleTest} disabled={placedComponents.length !== 4 || gameState === 'testing'} className={`
                px-3 md:px-6 py-2 rounded-lg font-mono text-xs md:text-sm transition-all duration-300
                ${placedComponents.length === 4 && gameState === 'playing' ? 'bg-[#5CE1E6] text-black hover:bg-[#5CE1E6]/80 shadow-[0_0_15px_#5CE1E6]' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}
                ${gameState === 'testing' ? 'animate-pulse' : ''}
              `}>
              {gameState === 'testing' ? 'Testing...' : 'Test Model'}
            </button>
            
            <button onClick={handleReset} className="px-3 md:px-6 py-2 rounded-lg font-mono text-xs md:text-sm bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all duration-300">
              Reset
            </button>
          </div>
        </div>

        {/* Placed Components List */}
        <div className="flex flex-col gap-2 md:gap-3 w-full max-w-xs lg:max-w-none lg:w-auto order-2 lg:order-3">
          <h3 className="text-[#5CE1E6] font-mono text-xs md:text-sm text-center mb-2">In the model</h3>
          <div className="flex flex-row lg:flex-col gap-2 justify-center">
            {Array.from({
            length: 4
          }, (_, i) => {
            const component = placedComponents[i];
            return <div key={i} onClick={() => component && handleComponentClick(component)} className={`
                    w-16 h-10 md:w-20 md:h-12 rounded border text-xs flex items-center justify-center
                    cursor-pointer font-mono hover:border-[#5CE1E6] hover:bg-[#5CE1E6]/10
                    ${component ? `${gameState === 'success' ? 'border-[#5CE1E6] text-[#5CE1E6] shadow-[0_0_10px_#5CE1E6]' : gameState === 'error' ? component.isCorrect ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-red-500/20 border-red-400 text-red-300' : 'bg-slate-700 border-slate-500 text-white hover:border-[#5CE1E6]'}` : 'border-dashed border-slate-600 text-slate-600'}
                  `}>
                  {component ? component.name : `Slot ${i + 1}`}
                </div>;
          })}
          </div>
        </div>
      </div>


    </div>;
};
export default AIModelBuilder;
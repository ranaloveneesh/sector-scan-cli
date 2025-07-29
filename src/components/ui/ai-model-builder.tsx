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
        {/* Available Components - 2 rows of 4 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#5CE1E6] font-mono text-sm text-center mb-2">Available Components</h3>
          <div className="grid grid-cols-4 gap-3">
            {availableComponents.map((component) => (
              <button
                key={component.id}
                draggable={gameState === 'playing'}
                onDragStart={() => handleDragStart(component)}
                onClick={() => handleComponentClick(component)}
                className={`
                  w-20 h-16 rounded-lg border-2 font-mono text-xs 
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
        </div>

        {/* Arc Reactor */}
        <div className="relative">
          {/* Flash Effect */}
          {showFlash && (
            <div className="absolute inset-0 bg-white rounded-full animate-ping z-30" />
          )}
          
          <div className="relative w-96 h-96">
            <svg 
              viewBox="0 0 384 384" 
              className="absolute inset-0 w-full h-full z-10"
              style={{ filter: gameState === 'success' ? 'drop-shadow(0 0 30px #5CE1E6)' : '' }}
            >
              {/* Metallic Outer Ring Structure - Iron Man Style */}
              <defs>
                <radialGradient id="metalGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#5CE1E6" stopOpacity="0.8"/>
                  <stop offset="50%" stopColor="#5CE1E6" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#5CE1E6" stopOpacity="0.1"/>
                </radialGradient>
                <linearGradient id="segmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5CE1E6" stopOpacity="1"/>
                  <stop offset="30%" stopColor="#ffffff" stopOpacity="0.8"/>
                  <stop offset="70%" stopColor="#5CE1E6" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.4"/>
                </linearGradient>
                <linearGradient id="outerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5CE1E6" stopOpacity="0.9"/>
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#5CE1E6" stopOpacity="0.3"/>
                </linearGradient>
              </defs>

              {/* Outermost Ring - Main Structure */}
              <circle
                cx="192"
                cy="192"
                r="168"
                fill="none"
                stroke="url(#outerRingGradient)"
                strokeWidth="4"
                opacity={gameState === 'success' ? "0.8" : "0.4"}
              />

              {/* Outer Ring Segments - Primary Segments */}
              {Array.from({ length: 20 }, (_, i) => {
                const angle = (i / 20) * 360;
                const isPrimarySegment = i % 4 === 0;
                const isSecondarySegment = i % 2 === 0 && !isPrimarySegment;
                const isActive = gameState === 'success';
                
                return (
                  <g key={`outer-${i}`}>
                    {/* Main segments */}
                    <rect
                      x={isPrimarySegment ? "172" : isSecondarySegment ? "175" : "178"}
                      y="14"
                      width={isPrimarySegment ? "40" : isSecondarySegment ? "34" : "28"}
                      height={isPrimarySegment ? "28" : isSecondarySegment ? "24" : "20"}
                      fill={isActive ? "url(#segmentGradient)" : "#5CE1E6"}
                      opacity={isActive ? (isPrimarySegment ? "1" : isSecondarySegment ? "0.8" : "0.6") : "0.3"}
                      transform={`rotate(${angle} 192 192)`}
                      className={isActive ? "animate-pulse" : ""}
                      style={{ animationDelay: `${i * 0.03}s` }}
                    />
                    
                    {/* Inner connector segments */}
                    <rect
                      x={isPrimarySegment ? "176" : "179"}
                      y="45"
                      width={isPrimarySegment ? "32" : "26"}
                      height="12"
                      fill={isActive ? "#5CE1E6" : "#5CE1E6"}
                      opacity={isActive ? "0.7" : "0.2"}
                      transform={`rotate(${angle} 192 192)`}
                      className={isActive ? "animate-pulse" : ""}
                      style={{ animationDelay: `${i * 0.03 + 0.1}s` }}
                    />
                    
                    {/* Detail lines for realism */}
                    {isPrimarySegment && (
                      <rect
                        x="190"
                        y="15"
                        width="4"
                        height="26"
                        fill="#ffffff"
                        opacity={isActive ? "0.6" : "0.2"}
                        transform={`rotate(${angle} 192 192)`}
                        className={isActive ? "animate-pulse" : ""}
                        style={{ animationDelay: `${i * 0.03 + 0.2}s` }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Secondary Ring Structure */}
              <circle
                cx="192"
                cy="192"
                r="135"
                fill="none"
                stroke="#5CE1E6"
                strokeWidth="3"
                opacity={gameState === 'success' ? "0.7" : "0.3"}
              />

              {/* Middle Ring Segments - More detailed */}
              {Array.from({ length: 16 }, (_, i) => {
                const angle = (i / 16) * 360;
                const isActive = gameState === 'success';
                const isMajor = i % 2 === 0;
                return (
                  <g key={`middle-${i}`}>
                    <rect
                      x={isMajor ? "180" : "183"}
                      y="70"
                      width={isMajor ? "24" : "18"}
                      height={isMajor ? "16" : "12"}
                      fill="url(#segmentGradient)"
                      opacity={isActive ? (isMajor ? "0.9" : "0.7") : "0.4"}
                      transform={`rotate(${angle} 192 192)`}
                      className={isActive ? "animate-pulse" : ""}
                      style={{ animationDelay: `${i * 0.06}s` }}
                    />
                    
                    {/* Inner detail for major segments */}
                    {isMajor && (
                      <rect
                        x="187"
                        y="88"
                        width="10"
                        height="8"
                        fill="#ffffff"
                        opacity={isActive ? "0.8" : "0.3"}
                        transform={`rotate(${angle} 192 192)`}
                        className={isActive ? "animate-pulse" : ""}
                        style={{ animationDelay: `${i * 0.06 + 0.15}s` }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Inner Ring Structure */}
              <circle
                cx="192"
                cy="192"
                r="108"
                fill="none"
                stroke="#5CE1E6"
                strokeWidth="2"
                opacity={gameState === 'success' ? "0.8" : "0.4"}
              />

              {/* Inner Ring Segments - Finest detail */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * 360;
                const isActive = gameState === 'success';
                return (
                  <g key={`inner-${i}`}>
                    <rect
                      x="186"
                      y="96"
                      width="12"
                      height="10"
                      fill="#5CE1E6"
                      opacity={isActive ? "0.9" : "0.5"}
                      transform={`rotate(${angle} 192 192)`}
                      className={isActive ? "animate-pulse" : ""}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    />
                    
                    {/* Fine detail lines */}
                    <line
                      x1="192"
                      y1="96"
                      x2="192"
                      y2="106"
                      stroke="#ffffff"
                      strokeWidth="1"
                      opacity={isActive ? "0.6" : "0.2"}
                      transform={`rotate(${angle} 192 192)`}
                      className={isActive ? "animate-pulse" : ""}
                      style={{ animationDelay: `${i * 0.08 + 0.1}s` }}
                    />
                  </g>
                );
              })}

              {/* Drop Zone - Keep as is */}
              <circle
                cx="192"
                cy="192"
                r="72"
                fill={placedComponents.length > 0 ? "url(#metalGradient)" : "none"}
                stroke="#5CE1E6"
                strokeWidth="2"
                strokeDasharray={placedComponents.length === 4 ? "none" : "8 4"}
                opacity="0.6"
              />
              
              {/* Energy Pulses on Success - Enhanced */}
              {gameState === 'success' && (
                <>
                  {/* Primary energy ring */}
                  <circle
                    cx="192"
                    cy="192"
                    r="84"
                    fill="none"
                    stroke="#5CE1E6"
                    strokeWidth="4"
                    strokeDasharray="20 8"
                    opacity="0.8"
                    className="animate-spin"
                    style={{ animationDuration: '2s' }}
                  />
                  
                  {/* Secondary energy ring */}
                  <circle
                    cx="192"
                    cy="192"
                    r="120"
                    fill="none"
                    stroke="#5CE1E6"
                    strokeWidth="2"
                    strokeDasharray="15 6"
                    opacity="0.6"
                    className="animate-spin"
                    style={{ animationDuration: '3s', animationDirection: 'reverse' }}
                  />
                  
                  {/* Outer energy pulse */}
                  <circle
                    cx="192"
                    cy="192"
                    r="150"
                    fill="none"
                    stroke="#5CE1E6"
                    strokeWidth="1"
                    strokeDasharray="10 4"
                    opacity="0.4"
                    className="animate-spin"
                    style={{ animationDuration: '4s' }}
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
              <div className="grid grid-cols-2 gap-0 w-24 h-24 place-items-center">
                {Array.from({ length: 4 }, (_, i) => {
                  const component = placedComponents[i];
                  return (
                    <div
                      key={i}
                      onClick={() => component && handleComponentClick(component)}
                      className={`
                        w-12 h-12 rounded border text-xs flex items-center justify-center
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
                  w-20 h-12 rounded border text-xs flex items-center justify-center
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
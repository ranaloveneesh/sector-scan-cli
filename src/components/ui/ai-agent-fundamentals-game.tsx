import React, { useState, useEffect } from 'react';

interface AgentFundamentalsGameProps {
  onComplete: (success: boolean) => void;
}

interface Element {
  id: string;
  name: string;
  isCorrect: boolean;
  angle: number;
}

const AgentFundamentalsGame: React.FC<AgentFundamentalsGameProps> = ({ onComplete }) => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [showNextMessage, setShowNextMessage] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const elements: Element[] = [
    { id: 'tools', name: 'Tools', isCorrect: true, angle: 0 },
    { id: 'reasoning', name: 'Reasoning', isCorrect: true, angle: 45 },
    { id: 'data', name: 'Data', isCorrect: true, angle: 90 },
    { id: 'workflows', name: 'Workflows', isCorrect: true, angle: 135 },
    { id: 'avatar', name: 'Avatar', isCorrect: false, angle: 180 },
    { id: 'chat', name: 'Chat', isCorrect: false, angle: 225 },
    { id: 'prompts', name: 'Prompts', isCorrect: false, angle: 270 },
    { id: 'plugins', name: 'Plugins', isCorrect: false, angle: 315 },
  ];

  // Continuous rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50); // Smooth rotation speed

    return () => clearInterval(interval);
  }, []);

  const handleElementClick = (elementId: string) => {
    if (selectedElements.includes(elementId) || selectedElements.length >= 4) return;
    
    const newSelected = [...selectedElements, elementId];
    setSelectedElements(newSelected);
    
    if (newSelected.length === 4) {
      setGameComplete(true);
      const allCorrect = newSelected.every(id => 
        elements.find(el => el.id === id)?.isCorrect
      );
      setTimeout(() => {
        setShowNextMessage(true);
        onComplete(allCorrect);
      }, 500);
    }
  };

  const getElementPosition = (angle: number, radius: number) => {
    const radian = ((angle + rotationAngle) * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Game Area */}
      <div className="relative w-96 h-96 mx-auto flex items-center justify-center">
        {/* Orbit Lines */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30" 
             style={{ 
               boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
               animation: 'pulse 3s infinite'
             }} />
        
        {/* Central Agent */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <img 
              src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png" 
              alt="AI Agent" 
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* Orbiting Elements */}
        {elements.map((element) => {
          const radius = 150;
          const position = getElementPosition(element.angle, radius);
          const isSelected = selectedElements.includes(element.id);
          
          return (
            <div
              key={element.id}
              className={`absolute w-16 h-16 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-xs font-semibold text-center leading-tight ${
                isSelected
                  ? 'bg-cyan-400 border-cyan-400 text-black shadow-lg shadow-cyan-400/50'
                  : 'bg-gray-800 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10'
              }`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                boxShadow: isSelected ? '0 0 25px rgba(6, 182, 212, 0.8)' : 'none'
              }}
              onClick={() => handleElementClick(element.id)}
            >
              {element.name}
            </div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index < selectedElements.length
                ? 'bg-cyan-400'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Next Message */}
      {showNextMessage && (
        <div className="mt-6 text-center animate-fade-in">
          <p className="text-cyan-400 text-lg font-medium">
            Click the "next" button to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default AgentFundamentalsGame;
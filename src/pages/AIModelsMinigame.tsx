import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrainGame from '@/components/ui/ai-brain-game';

const AIModelsMinigame = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/aiagents');
  };

  return (
    <BrainGame onComplete={handleComplete} />
  );
};

export default AIModelsMinigame;
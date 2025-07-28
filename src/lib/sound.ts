// Futuristic spaceship panel click sound
export const playSpaceshipClick = (volume: number = 0.12) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create two oscillators for a richer sound
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect oscillators to gain
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set up the frequencies (main tone + harmonic)
    osc1.frequency.setValueAtTime(1200, audioContext.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15);
    
    osc2.frequency.setValueAtTime(2400, audioContext.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(1600, audioContext.currentTime + 0.1);
    
    // Use square wave for digital character
    osc1.type = 'square';
    osc2.type = 'triangle';
    
    // Sharp attack, quick decay
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
    
    // Start and stop
    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 0.15);
    osc2.stop(audioContext.currentTime + 0.15);
  } catch (err) {
    console.debug('Audio creation failed:', err);
  }
};

export const playSound = (soundPath: string, volume: number = 0.3) => {
  try {
    const audio = new Audio(soundPath);
    audio.volume = volume;
    audio.play().catch(err => {
      console.debug('Audio play failed:', err);
    });
  } catch (err) {
    console.debug('Audio creation failed:', err);
  }
};

export const sounds = {
  sciFiClick: '/sounds/sci-fi-click.wav',
  minimalClick: '/sounds/minimal-click.wav',
} as const;
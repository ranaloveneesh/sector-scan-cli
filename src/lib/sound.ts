// Simple UI beep using Web Audio API
export const playUIBeep = (frequency: number = 800, duration: number = 100, volume: number = 0.1) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
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
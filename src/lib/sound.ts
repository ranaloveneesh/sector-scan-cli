export const playSound = (soundPath: string, volume: number = 0.3) => {
  try {
    const audio = new Audio(soundPath);
    audio.volume = volume;
    audio.play().catch(err => {
      // Silently handle autoplay restrictions
      console.debug('Audio play failed:', err);
    });
  } catch (err) {
    console.debug('Audio creation failed:', err);
  }
};

export const sounds = {
  sciFiClick: '/sounds/sci-fi-click.wav',
} as const;
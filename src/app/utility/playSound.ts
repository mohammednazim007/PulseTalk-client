// utils/playSound.ts
// src/app/utils/playSound.ts
export const playSound = (type: "success" | "cancel") => {
  const path = `/audio/${type}.mp3`; // <-- points to public/audio/
  const audio = new Audio(path);
  audio.volume = 0.7;
  audio.play().catch((err) => console.error("Audio playback failed:", err));
};

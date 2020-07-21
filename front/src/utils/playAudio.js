import audioRSI from '../assets/Crash Test Dummies - Mmm Mmm Mmm Mmm (Official Video)_2.mp3';
import audioWilliams from '../assets/Alessandro Safina - Luna (official video)_1.mp3';
const song = {
  StochRSI: new Audio(),
  'Will %R': new Audio()
};

song.StochRSI.src = audioRSI;
song['Will %R'].src = audioWilliams;

export const playAudio = key => {
  for (const k of Object.keys(song)) {
    if (key !== k) {
      song[k].pause();
      song[k].currentTime = 0;
    }
  }

  song[key] && song[key].play();
};

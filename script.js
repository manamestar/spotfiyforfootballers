const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const rewindBtn = document.getElementById('rewind');
const repeatBtn = document.getElementById('repeat');
const progressBar = document.getElementById('progress-bar');
const songTitle = document.getElementById('song-title');

const songs = [
  { title: 'lamine yamal', file: 'audio/Lamine Yamal - Y QUE FUE_ (Don Miguelo).mp3', image: 'images/lamine yamal.JPG' },
  { title: 'doue', file: 'audio/doue.mp3', image: 'images/doue.JPG' },
  { title: 'neymar', file: 'audio/neymar.mp3', image: 'images/neymar.JPG' },
  { title: 'nico williams', file: 'audio/nico williams.mp3', image: 'images/nico williams.JPG' },
];

let currentSongIndex = 0;
let isPlaying = false;
let isRepeat = false;

// Load initial song
loadSong(currentSongIndex);

function loadSong(index) {
  audio.src = songs[index].file;
  songTitle.textContent = songs[index].title;
  cover.src = songs[index].image;
}


playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<img src="https://img.icons8.com/ios-glyphs/30/000000/play.png"/>';
  } else {
    audio.play();
    playBtn.innerHTML = '<img src="https://img.icons8.com/ios-glyphs/30/000000/pause.png"/>';
  }
  isPlaying = !isPlaying;
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
});

rewindBtn.addEventListener('click', () => {
  audio.currentTime = 0;
});

repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.style.background = isRepeat ? '#38bdf8' : '#334155';
});

audio.addEventListener('ended', () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextBtn.click();
  }
});

// Progress bar update
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
});

const progressContainer = document.getElementById('progress-container');

// Seek when clicking on progress bar
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});


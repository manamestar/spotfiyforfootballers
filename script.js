const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const repeatBtn = document.getElementById('repeat');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');

const songTitle = document.getElementById('song-title');
const cover = document.getElementById('cover');

// Stats elements
const goalsEl = document.getElementById('goals');
const assistsEl = document.getElementById('assists');
const matchesEl = document.getElementById('matches');

// Players array with more accurate stats (approximate, updated to 2025)
const players = [
  {
    name: 'Lamine Yamal',
    goals: 15,           // Emerging talent, limited senior games but growing fast
    assists: 18,
    matches: 50,
    image: 'images/lamine yamal.JPG',
    song: 'audio/Lamine Yamal - Y QUE FUE_ (Don Miguelo).mp3',
  },
  {
    name: 'Lamine Yamal (2)',
    goals: 15,
    assists: 18,
    matches: 50,
    image: 'images/lamine yamal.JPG',
    song: 'audio/Lamine Yamal  SHAKE BODY  SKALES.mp3',
  },
  {
    name: 'Désiré Doué',
    goals: 12,
    assists: 12,
    matches: 43,
    image: 'images/doue.JPG',
    song: 'audio/doue.mp3',
  },
  {
    name: 'Neymar',
    goals: 400,
    assists: 200,
    matches: 550,
    image: 'images/neymar.JPG',
    song: 'audio/neymar.mp3',
  },
  {
    name: 'Nico Williams',
    goals: 5,
    assists: 5,
    matches: 29,
    image: 'images/nico williams.JPG',
    song: 'audio/nico williams.mp3',
  },
  {
    name: 'Ronaldinho',
    goals: 200,
    assists: 150,
    matches: 650,
    image: 'images/ronaldinho.JPG',
    song: 'audio/ronaldinho.mp3',
  },
  {
    name: 'Raphinha',
    goals: 25,
    assists: 18,
    matches: 40,
    image: 'images/raphinha.JPG',
    song: 'audio/raphinha.mp3',
  },
  {    name: 'Afif',
       goals: 23,
       assists: 20,
       matches: 36,
       image: 'images/afif.JPG',
       song: 'audio/afif.mp3',
  },
];

let currentSongIndex = 0;
let isPlaying = false;
let isRepeat = false;

// Load initial player and song
loadSong(currentSongIndex);

function loadSong(index) {
  audio.src = players[index].song;
  songTitle.textContent = players[index].name;
  cover.src = players[index].image;

  goalsEl.textContent = `Goals: ${players[index].goals}`;
  assistsEl.textContent = `Assists: ${players[index].assists}`;
  matchesEl.textContent = `Matches: ${players[index].matches}`;
}

// Play / Pause toggle
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

// Next player/song
nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % players.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
});



// Previous
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + players.length) % players.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
});

// Toggle repeat mode
repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.style.background = isRepeat ? '#38bdf8' : '#334155';
});

// When song ends
audio.addEventListener('ended', () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextBtn.click();
  }
});

// Update progress bar as audio plays
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }
});

// Seek functionality on progress bar click
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

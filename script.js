const songs = [
  {
    title: "Bella Ciao",
    artist: "Becky G",
    file: "songs/Bella Ciao.mp3"
  },
  {
    title: "Despacito",
    artist: "Luis Fonsi, Daddy Yankee",
    file: "songs/Despacito.mp3"
  },
  {
    title: "Calm down",
    artist: "Rema, Selena Gomez",
    file: "songs/Calm Down.mp3"
  },
  {
    title: "Night Changes",
    artist: "One Direction",
    file: "songs/Night Changes.mp3"
  },
  {
    title: "Die with A Smile",
    artist: "Bruno Mars, Lady Gaga",
    file: "songs/Die with A Smile.mp3"
  }
];

let currentSong = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
  cover.src = "cover.jpg"; // optional: set different cover for each
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;

  let mins = Math.floor(audio.currentTime / 60);
  let secs = Math.floor(audio.currentTime % 60);
  currentTimeEl.textContent = `${mins}:${secs < 10 ? '0' + secs : secs}`;

  if (!isNaN(audio.duration)) {
    let dmins = Math.floor(audio.duration / 60);
    let dsecs = Math.floor(audio.duration % 60);
    durationEl.textContent = `${dmins}:${dsecs < 10 ? '0' + dsecs : dsecs}`;
  }
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener('ended', () => {
  // autoplay next song
  nextBtn.click();
});

// Load first song
loadSong(currentSong);

const musicButton = document.querySelector(".music");
const songSrc = "./music.mp3";
const song = new Audio(songSrc);
window.addEventListener("load", () => {
  document.querySelector(".all-content").style.display = "block";  
});
musicButton.addEventListener("click", playOrPauseSong);
function playOrPauseSong() {
  if (song.paused) {
    song.play();
    musicButton.style.background =
      "var(--main-light-color) url('./images/musicOff.svg') no-repeat center /55%";
  } else {
    song.pause();
    musicButton.style.background =
      "var(--main-light-color) url('./images/musicOn.svg') no-repeat center /55%";
  }
}
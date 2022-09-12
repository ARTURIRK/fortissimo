import "tippy.js/dist/tippy.css";
import "./styles/main.css";
import musicOff from "./images/musicOff.svg";
import musicOn from "./images/musicOn.svg";
import music from "./music.mp3";
const docWidth = document.body.getBoundingClientRect().width
const tippy = require("tippy.js").default;
const musicButton = document.querySelector(".music");
const song = new Audio(music);
window.addEventListener("load", () => {
  document.body.style.visibility = "visible";
});
musicButton.addEventListener("click", playOrPauseSong);
function playOrPauseSong() {
  if (song.paused) {
    song.play();
    musicButton.style.backgroundImage = `url(${musicOff})`;
  } else {
    song.pause();
    musicButton.style.backgroundImage = `url(${musicOn})`;
  }
}
if(docWidth > 764) {
  tippy("#music", {
    content: "Нажмите для воспроизведения музыки",
    placement: "left",
    arrow: true,
    animation: "fade",
    theme: "light",
    onShow(instance) {
      if (!song.paused) {
        return false
      }
    },
  });
}
else {
  document.querySelector('.mobile-tooltip').style.display = 'flex'
  setTimeout(() => {
    document.querySelector('.mobile-tooltip').style.display = 'none'
  }, 5000)
}


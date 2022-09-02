document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".loader-cont").style.display = "flex";
});
window.addEventListener("load", () => {
  document.querySelector(".loader-cont").remove();
  document.querySelector(".all-content").style.display = "block";
});

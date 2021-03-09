const body = document.querySelector("body");

const IMG_NUMBER = 5;

function handleImgLoad(image) {
  image.classList.add("bgImage");
  body.prepend(image);
}

function paintImage(imgNumber) {
  const image = new Image(); // object 생성
  image.src = `/chromeapp/images/${imgNumber + 1}.jpg`;
  image.addEventListener("load", handleImgLoad(image));
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();

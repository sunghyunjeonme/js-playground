const weather = document.querySelector(".js-weather");
const API_KEY = "9dee0be66c49a73d09467a2844f1d34e";
const COORDS = "coords";

// 자바스크립트를 통해서 특정 URL을 호출하기

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  console.log(coordsObj);
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();

// 1. loadCoords 함수는 로컬 스토리지 key 값에 COORDS를 저장한다.
// 만약, 로컬 스토리지 값이 비어있으면 그때 askForCoords 함수를 호출한다.
// 2. askForCoords 함수는 위치 정보 요청에 성공했을 때, 실패했을 때를 나눈다.

// 로컬 스토리지에 값이 있다면, 로컬 스토리지 값을 다시 object로 변환하고 getWeather 함수를 호출한다.

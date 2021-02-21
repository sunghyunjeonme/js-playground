const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); // event가 일어나지 못 하게 막음.
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
// value를 갖고 paintGreeting 함수를 다시 불러서

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit); // 무엇인가를 form에 submit하면 handler를 호출한다.
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}
// paintGreeting 함수는 form을 지우고
// greeting을 보여주고
// 내가 보낸 text를 넣어준다.

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // currentUser가 없으면 user의 이름을 요청한다.
    askForName();
  } else {
    // 유저가 있는 경우
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();

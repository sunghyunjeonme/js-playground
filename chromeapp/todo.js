const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

// const form, input으로 상수를 지정할 수 있지만 greeting.js 파일에 동일한 이름이 존재하기 때문에 사용할 수 없다. 이와 관련되서 자바스크립트로 모듈을 분리시키는 방법을 공부해야 함.

const TODOS_LS = "toDos";

function paintToDo(text) {
  console.log(text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

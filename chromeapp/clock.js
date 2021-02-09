const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

// 초기화 과정

function init() {
  getTime();
  setInterval(getTime, 1000); // setInterval 메서드를 사용해서 실시간으로 시간이 업데이트 되도록 함.
}

init();

/* 

문제 : 

setIntervel 메서드 안에 인자로 getTime 메서드를 넣고 실행하면
숫자가 01, 02 형태로 나오지 않고 0, 1 형태로 나오게 된다. 

배운 개념 :

1. 삼항 연산자 

< ? ture일 때의 조건 : false일 때의 조건 >

seconds가 10보다 작으면(참이면) `0${seconds}`를 실행시키고
seconds가 10보다 작지 않으면 seconds를 실행시켜라.

2. 템플릿 리터럴 

백틱(``)을 사용해서 문자열을 표현하고 ${}를 활용해서 동적인 변수의 값을 불러올 수 있다.
문자열과 자바스크립트 표현식을 ``으로 함께 묶어 사용할 수 있다.

*/

"use strict";

// 프로미스는 자바스크립트 내부에 내장되어 있는 오브젝트이다.
// 프로미스는 비동기 통신을 할 때, 콜백 함수 대안으로 유용하게 사용할 수 있다.

// 프로미스는 딱 두 가지 포인트를 잡고 공부하면 되는데
// 첫 번째로 state, 상태이다.
// 프로세스가가 무거운 작업 실행 중인지, 기능을 다 수행하고 그게 성공했는지 실패했는지
// 정보를 제공하는 producer vs 정보를 사용하는 consumers

// 1. state : pending(실행 중) -> fulfilled(성공/실패) or rejected(네트워크 문제거나)

// 프로미스가 만들어져서 지정한 작업이 수행 중일 때는 pending 상태가 된다.

// 지정한 작업이 끝나면 fulfilled 상태

// 문제가 생긴다면 rejected 상태

// Producer vs Consumers

// 1. Producer
// * 새로운 프로미스가 만들어질 때는 전달한 함수가 바로 실행이 된다.

const promise = new Promise((resolve, reject) => {
  // 네트워크에서 데이터를 받아 오거나, 파일에서 큰 데이터를 읽어오거나 하는 작업이 동기적으로 이루어진다면, 다음 코드가 실행되지 않는다.
  // so, 비동기적인 처리를 해야 함. 프로미스를 만들어서 비동기적으로 처리할 수 있음.
  console.log("doing something...");
  setTimeout(() => {
    // resolve("hyun");
    reject(new Error("no network"));
  }, 2000);
});

// 프로미스를 생성했으니, 이것을 이용하는 Consumers를 만들어야 한다.

// 2. Consumers : then, catch, finally를 이용해서 값을 받아올 수 있다.

promise
  .then((value) => {
    console.log(value);
  })
  // 프로미스에서 then을 이용해서 성공적인 값을 다뤘다면
  // catch를 이용해서 에러가 발생했을 때, 어떻게 할 것인지
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// finally는 마지막에 성공/실패 상관 없이 기능을 추가하고 싶을 때 사용할 수 있음.

// 프로미스 체이닝
// then을 호출하게 되면 프로미스가 리턴되고 리턴된 프로미스에 catch를 등록하는 것.

const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

// resolve에 있는 1이 fetchNumber의 then의 인자 num에 담김
// num = 1 / num * 2 = 2
// num = 2 / num * 3 = 6
// 6이 서버로 전달되고 새로운 Promise를 반환한다.
// num에 then num (6)이 담겨서
// 5가 출력된다
// then은 값을 바로 전달할 수도 있고, 프로미스를 전달할 수도 있다.

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("🐔"), 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error ${hen} => 🥚`)), 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen() //
  .then(getEgg)
  .catch((error) => {
    return "빵";
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);

/*
// ES6부터 자바스크립트의 표준 내장 객체로 추가되었다.
// ES6를 지원하는 브라우저나 Node.js에서 전역에 있는 Promise를 확인할 수 있다.
// */

// /*
// 생성자를 통해서 프로미스 객체를 만들 수 있다.
// 생성자의 인자로 executor라는 함수를 이용한다.
// */

// new Promise(/*executor*/);

// /*
// executor 함수는 resolve와 reject를 인자로 가진다.
// (resolve, reject) => { ... }
// resolve와 reject는 함수이다.
// resolve(), reject()
// */

// new Promise(/*executor*/ (resolve, reject) => {});

// /*
// 생성자를 통해서 프로미스 객체를 만드는 순간 pending (대기) 상태가 된다.
// */

// new Promise((resolve, reject) => {}); // pending 상태

// /*
// executor 함수 인자 중 하나인 resolve 함수를 실행하면, fulfilled (이행) 상태가 된다.
// */

// new Promise((resolve, reject) => {
//   resolve(); // resolve 함수를 호출하면 fulfilled 상태
// });

// /*
// executor 함수 인자 중 하나인 reject 함수를 실행하면, rejected (거부) 상태가 된다.
// */

// new Promise((resolve, reject) => {
//   reject(); // reject 함수를 호출하면 rejected 상태
// });

// /*
// 생성자 함수를 통해 프로미스 객체를 만들면, executor 함수를 인자로 받는다. 동시에 pending 상태로 들어가게 되고 비동기 통신이 일어나게 되고 비동기 통신이 끝났을 때 성공적이면 executor 함수의 첫 번째 인자 resolve를 호출해서 fulfilled 상태로 만들 수 있다. reject는 그 반대.
// */

// // producer - 프로미스 객체 생성
// // p라는 프로미스 객체는 1000ms 후에 fufilled 상태가 된다.
// const p = new Promise((reslove, reject) => {
//   /* pending */
//   setTimeout(() => {
//     resolve(); /* fulfilled */
//   }, 1000);
// });

// // consumer - 프로미스 객체를 이용
// // p라는 프로미스 객체가 fulfilled 되는 시점에 p.then 안에 설정한 callback 함수가 실행된다.
// p.then(() => {

// })

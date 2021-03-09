// fetch API를 이용해서 data 불러오기

function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);

  //  loadItems 함수는 fetch API를 이용해서 데이터를 불러온다.
  //  불러온 데이터가 성공적이면 json으로 변환하고
  //  json 안에 있는 items을 반환하게 된다.
  //  console.log로 데이터가 잘 들어왔는지를 항상 확인하자.
}
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");

  // displayItems 함수는 인자로 json의 item 데이터를 넘겨 받고
  // 해당 데이터를 HTML 요소로 변환해서 페이지에 표시해주는 함수이다.
}

function createHTMLString(item) {
  return `
    <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
    <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  console.log(dataset);
  const key = dataset.key;
  const value = dataset.value;

  if ((key === null) | (value === null)) {
    return;
  }
  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

//  main
loadItems()
  // promise를 return
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);

// Note
// loadItems에서 items을 동적으로 받아온 후에
// 받아온 items를 displayItems 함수를 호출해서 container에 innerHTML을 업데이트 했다.
// 업데이트는 받아온 아이템 오브젝트를 li의 문자열 배열로 변환하고 하나의 문자열 배열로 만들어서 inner에 추가했다.

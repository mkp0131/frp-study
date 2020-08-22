// # FRP ES6
const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

// ## map 을 직접 구현
const map = (fn, iterable) => {
  let result = [];
  for (const iterator of iterable) {
    result.push(fn(iterator));
  }
  return result;
};

// ### 자바스크립트 map 함수를 `arry like object` 에 사용하기
// 1. bind 사용
const _map = Array.prototype.map;
const nodeList = document.querySelectorAll("*");
// _map.call(nodeList, (element) => console.log("", element));

// for (let i = 0; i < nodeList.length; i++) {
//   const element = nodeList[i];
//   console.log("", element);
// }

// const m = new Map();
// m.set(1, 4);
// m.set(2, 4);
// m.set(3, 4);

// const result = map(([key, value]) => [key, value * 2], m);
// console.log("", result);

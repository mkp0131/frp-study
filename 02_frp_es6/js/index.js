// # FRP ES6
const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

// ## each [map, filter 에서 사용]
const each = (fn, iterable) => {
  for (const iterator of iterable) {
    fn(iterator);
  }
};

// ## map 을 직접 구현
let map = (fn, iterable) => {
  let result = [];
  each((item) => result.push(fn(item)), iterable);
  return result;
};

// ### 자바스크립트 map 함수를 `arry like object` 에 사용하기
// 1. bind 사용
const _map = Array.prototype.map;
const nodeList = document.querySelectorAll("*");
// _map.call(nodeList, (element) => console.log("", element));

// ## filter
let filter = (fn, iterable) => {
  let result = [];
  each((item) => {
    if (fn(item)) result.push(item);
  }, iterable);
  return result;
};

// ## reduce
let reduce = (fn, acc, iterable) => {
  if (!iterable) {
    iterable = acc[Symbol.iterator]();
    acc = iterable.next().value;
  }
  each((item) => {
    acc = fn(acc, item);
  }, iterable);
  return acc;
};

// ## go (값을 즉시 평가)
const go = (...fns) => {
  reduce((acc, fn) => {
    return fn(acc);
  }, fns);
};

// go(
//   0,
//   (a) => a + 1,
//   (a) => a + 200,
//   console.log
// );

// ## pipe (특정한 값을 추출하는 함수팩)
const pipe = (fn1, ...fns) => (...arg) => go(fn1(...arg), ...fns);

// ## curry (함수의 평가시점을 컨트롤(미리 arg를 세팅))
const curry = (fn) => (a, ...b) =>
  b.length ? fn(a, ...b) : (...b) => fn(a, ...b);
const curryr = (fn) => (a) => (b) => fn(b, a);

// curry 적용
map = curry(map);
filter = curry(filter);
reduce = curry(reduce);
// const ttt = pipe(
//   (a, b) => a + b,
//   (a) => a + 1,
//   (a) => a + 300,
//   console.log
// );

// 중복되는 함수 pipe 로 축약 예시
const totalPirce = (predi) =>
  pipe(
    filter(predi),
    map((item) => item.price),
    reduce((a, b) => a + b),
    console.log
  );

// go(
//   products,
//   totalPirce((item) => item.price > 20000)
// );

// go(
//   products,
//   totalPirce((item) => item.price < 20000)
// );

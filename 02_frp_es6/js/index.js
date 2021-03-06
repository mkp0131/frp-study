// # FRP ES6
const products = [
  { name: "반팔티", price: 15000, quantity: 1, is_selected: true },
  { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
  { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: true },
  { name: "후드티", price: 30000, quantity: 4, is_selected: false },
  { name: "바지", price: 25000, quantity: 5, is_selected: true },
];

// ## curry (함수의 평가시점을 컨트롤(미리 arg를 세팅))
const curry = (fn) => (a, ...b) =>
  b.length ? fn(a, ...b) : (...b) => fn(a, ...b);
const curryr = (fn) => (a) => (b) => fn(b, a);

// ## 지연평가 함수 모음 객체 L
const L = {};

// ## L.range (제너레이터를 이용한 함수)
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    // console.log("#", i);
    yield i;
  }
};

// ## L.map 지연평가 (iterator 를 반환하는 generator 함수)
L.map = curry(function* (fn, iterable) {
  for (const iterator of iterable) {
    // console.log("!map");
    yield fn(iterator);
  }
});

// ## L.filter 지연평가
L.filter = curry(function* (predi, iterable) {
  for (const iterator of iterable) {
    if (predi(iterator)) yield iterator;
  }
});

// L.entries (object.entries 지연평가)
L.entries = function* (object) {
  for (const key in object) {
    yield [key, object[key]];
  }
};

// ## each [map, filter 에서 사용]
const each = (fn, iterable) => {
  for (const iterator of iterable) {
    fn(iterator);
  }
};

// ## map 을 직접 구현
// let map = (fn, iterable) => {
//   let result = [];
//   each((item) => result.push(fn(item)), iterable);
//   return result;
// };

// ### 자바스크립트 map 함수를 `arry like object` 에 사용하기
// 1. bind 사용
const _map = Array.prototype.map;
const nodeList = document.querySelectorAll("*");
// _map.call(nodeList, (element) => console.log("", element));

// ## filter
// let filter = (fn, iterable) => {
//   let result = [];
//   each((item) => {
//     console.log("$2");
//     if (fn(item)) result.push(item);
//   }, iterable);
//   return result;
// };

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
const go = (...fns) => reduce((acc, fn) => fn(acc), fns);

// go(
//   0,
//   (a) => a + 1,
//   (a) => a + 200,
//   console.log
// );

// ## pipe (특정한 값을 추출하는 함수팩)
const pipe = (fn1, ...fns) => (...arg) => go(fn1(...arg), ...fns);

// curry 적용
reduce = curry(reduce);
// const ttt = pipe(
//   (a, b) => a + b,
//   (a) => a + 1,
//   (a) => a + 300,
//   console.log
// );

// 중복되는 함수 pipe 로 축약 예시
// const totalPirce = (predi) =>
//   pipe(
//     filter(predi),
//     map((item) => item.price),
//     reduce((a, b) => a + b),
//     console.log
//   );

// ### add 함수
const add = (a, b) => a + b;

// go(
//   products,
//   totalPirce((item) => item.price > 20000)
// );

// go(
//   products,
//   totalPirce((item) => item.price < 20000)
// );

// 연습문제
// 1. 모든 item 의 수량을 합산해주는 함수
// const sum = curry((predi, products) => pipe(map(predi), reduce(add))(products));

// const total_price = sum((item) => item.quantity * item.price);

// const total_quantity = sum((item) => item.quantity);

// // result = total_quantity(products);
// // console.log("", result);

// const str = `<table>
// 			<thead>
// 				<tr>
// 					<th></th>
// 					<th>상품</th>
// 					<th>가격</th>
// 					<th>수량</th>
// 					<th>합계</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 			${go(
//         products,
//         sum(
//           (item) =>
//             `<tr>
// 						<td>
// 							<input type="checkbox" ${item.is_selected ? "checked='checked'" : ""} />
// 						</td>
//             <td>${item.name}</td>
//             <td>${item.price}</td>
//             <td>${item.quantity}</td>
//             <td>${item.quantity * item.price}</td>
//           </tr>`
//         )
//       )}
// 			<tr>
// 				<td colspan="2">합계</td>
// 				<td>${total_quantity(
//           filter((item) => (item.is_selected ? item.quantity : 0), products)
//         )}
// 				</td>
// 				<td>${go(
//           products,
//           sum((item) => (item.is_selected ? item.quantity : 0))
//         )}</td>
// 				<td>${go(
//           products,
//           sum((item) => (item.is_selected ? item.quantity * item.price : 0))
//         )}</td>
// 			</tr>
// 			</tbody>
// 		</table>`;

// document.querySelector("#root").innerHTML = str;

// ## range
const range = (l) => {
  let i = -1;
  let result = [];
  while (++i < l) {
    result.push(i);
  }
  return result;
};

// ## take (iterable 을 잘라주는 함수)
let take = (l, iterable) => {
  let result = [];
  for (const iterator of iterable) {
    result.push(iterator);
    if (l === result.length) return result;
  }
  return result;
};
take = curry(take);

// join (reduce 를 이용하여 join 함수 생성)
const join = curry((sep = ",", iterable) => {
  return reduce((a, b) => a + sep + b, iterable);
});

// queryStr 함수 만들기
// limit=10&offset=10&type=notice 의 문자열로 만들어라
const queryStr = (obj) =>
  go(
    obj,
    L.entries,
    L.map(([a, b]) => `${a}=${b}`),
    join("&"),
    console.log
  );
// queryStr({ limit: 10, offset: 10, type: "notice" });

// let querySample = { limit: 10, offset: 10, type: "notice" };

// ## find (조건에 맞는 처음 값을 return)
const find = curry((predi, iterable) =>
  go(iterable, filter(predi), take(1), ([item]) => item)
);

// 모든 배열을 return
const takeAll = take(Infinity);

// ## map => L.map 으로 리팩토링
let map = pipe(L.map, takeAll);
map = curry(map);

// ## filter => L.filter으로 리팩토링
let filter = pipe(L.filter, takeAll);
filter = curry(filter);

// result = filter((a) => a > 2, [1, 2, 3]);
// result = L.map((a) => a + 2, [1, 2, 3]);

// ## isIterable (이터러블인지 확인하는 함수)
const isIterable = (a) => a && a[Symbol.iterator];

// console.log("", !!((123)[length] && 1));

// ## L.flatten arr안에 arr로 들어가는 값을 모두 분해해서 하나의 arr로 만는 함수
// L.flatten = function (list) {
//   let result = [];
//   for (let i = 0; i < list.length; i++) {
//     const element = list[i];
//     if (typeof element === "object") {
//       result.push(...element);
//     } else {
//       result.push(element);
//     }
//   }
//   return result;
// };
L.flatten = function* (iterable) {
  for (const iterator of iterable) {
    if (isIterable(iterator)) {
      for (const a of iterator) {
        // console.log("#flatten");
        yield a;
      }
    } else {
      // console.log("#flatten");
      yield iterator;
    }
  }
};

// const flatten = (iterable) => go(iterable, L.flatten, take(Infinity));
const flatten = pipe(L.flatten, take(Infinity));

// result = flatten([[1, 2], 3, [5, 5, 5, 5, 5]]);
// console.log("flatten", result);

// result = [[1, 2], [3], [5, 5, 5, 5, 5]].map(
// 	a => {
// 		let result = a.map(
// 		b => {
// 			console.log('', b);
// 			return b;
// 		});
// 		console.log('result', result);
// 		return result;
// 	}
// );
// console.log('1', result);

// result = flatten([[1, 2], [3], [5, 5, 5, 5, 5]]).map(a => a + '#');
// console.log('2', result);

// ## L.flatMap (2차 배열의 값을 모두 펼치면서 map을 적용 => iterator 을 return)
// L.flatMap = (fn, list) => go(
// 	list,
// 	L.flatten,
// 	map(fn)
// )
L.flatMap = curry(
  pipe(
    L.map,
    L.flatten
    // takeAll
  )
);

// ## flatMap (배열을 바로 return)
const flatMap = curry(pipe(L.map, flatten));

// result = flatMap(map(a => a + '$'), [[1, 2], [3], [5, 5, 5, 5, 5]]);
// console.log('', result);

// 기본 자바스크립트의 flatMap
// result = [[[33, 2]], 3, [5, 5, 5, 5, 5]].flatMap((a) => {
//   // console.log('a', a);
//   const map = Array.prototype.map;
//   return map.call(a, (b) => b + "$");
// });
// console.log("@", result);

var users = [
  {
    name: "a",
    age: 21,
    family: [
      { name: "a1", age: 53 },
      { name: "a2", age: 47 },
      { name: "a3", age: 16 },
      { name: "a4", age: 15 },
    ],
  },
  {
    name: "b",
    age: 24,
    family: [
      { name: "b1", age: 58 },
      { name: "b2", age: 51 },
      { name: "b3", age: 19 },
      { name: "b4", age: 22 },
    ],
  },
  {
    name: "c",
    age: 31,
    family: [
      { name: "c1", age: 64 },
      { name: "c2", age: 62 },
    ],
  },
  {
    name: "d",
    age: 20,
    family: [
      { name: "d1", age: 42 },
      { name: "d2", age: 42 },
      { name: "d3", age: 11 },
      { name: "d4", age: 7 },
    ],
  },
];

// go(
//   users,
//   L.map((user) => user.family),
//   L.flatten,
//   L.filter((family) => family.age > 18),
//   L.map((family) => family.name),
//   take(3),
//   console.log
// );

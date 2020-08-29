console.log("##### 시작");
let result;

// 1. 3초후에 10을 더하는 함수를 만들어라 (settimeout)
function add10(a, callback) {
  setTimeout(() => {
    callback(a + 10);
  }, 3000);
}

// add10(80, function (a) {
//   add10(a, console.log);
// });

// 2. 3초후에 20을 더하는 함수를 만들어라 (Promise)
const add20 = (a) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("a", a);
      resolve(a + 20);
      // reject(new Error("error^^^"));
    }, 1000);
  });
};

// add20(10)
//   // .then((value) => console.log(value))
//   .then(add20)
//   .then((value) => console.log(value))
//   .catch((error) => console.log(error))
//   .finally((value) => console.log("fi", value));

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(callback(a + 20));
//   }, 3000);
// });

// Promise chaining
// 1. 서버에서 받은 숫자를 처리한다음
// 2. 다른 서버로(promise) 로 보내 값을 변경한후 return 받는다.
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

// fetchNumber
//   .then((n) => n + 1)
//   .then((n) => n * 2)
//   .then((n) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(n + 100);
//       }, 1);
//     });
//   })
//   .then(console.log);

// ## 1초 후에 콜백이 실행되는 Promise 생성
// const oneSecond = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(new Date().toISOString());
//     }, 1000);
//   });
// };

// oneSecond()
//   .then((t) => {
//     console.log(t);
//     return oneSecond();
//   })
//   .then((t) => {
//     console.log(t);
//     return oneSecond();
//   })
//   .then((t) => {
//     console.log(t);
//     return oneSecond();
//   });

// ## 🥚 => 🐥 => 🐓 의 Promise chanining 을 생성
const chick = (prev) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(prev + " => 🐥");
    }, 1000);
  });
};
const chicken = (prev) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(prev + " => 🐓");
    }, 1000);
  });
};
// chick("🥚") //
//   .then(chicken)
//   .then((v) => console.log(v));

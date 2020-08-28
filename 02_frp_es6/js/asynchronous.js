console.log("##### 시작");

// 1. 3초후에 10을 더하는 함수를 만들어라
function add10(a, callback) {
  setTimeout(() => {
    callback(a + 10);
  }, 3000);
}

add10(80, function (a) {
  add10(a, console.log);
});

// # 다시 공부 20200811

// ## 1. 함수형 프로그래밍 개요

function add_maker(a) {
  return function (b) {
    return a + b;
  };
}

const add10 = add_maker(10);

function f4(f1, f2, f3) {
  return f3(f1() + f2());
}

let result = f4(
  function () {
    return 1;
  },
  function () {
    return 5;
  },
  function (a) {
    return a * a;
  }
);

// ## 2. 함수형으로 전환하기
var users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 },
];

// 1. 30세이상의 user 를 거른다.
let temp_users = [];
for (let i = 0; i < users.length; i++) {
  const user = users[i];
  if (user.age >= 30) {
    temp_users.push(user);
  }
}
console.log("temp_users", temp_users);

// 2. 30세이상인 user 의 name 을 수집
let temp_users_name = [];
for (let i = 0; i < temp_users.length; i++) {
  const user = temp_users[i];
  temp_users_name.push(user.name);
}
console.log("temp_users_name", temp_users_name);



// 3. 30세 이상인 user 함수형
result = _filter(users, function (user) {
  return user.age >= 30;
});
console.log("30세이상[함수형]", result);
result = _filter(users, function (user) {
  return user.age < 30;
});
console.log("30미만[함수형]", result);



// name을 수집 함수형
result = _map(users, function (user) {
  return user.name;
});
console.log("name을 수집", result);


// %%%%%%%%%%%%%%%%%%%%%%%%%%% 함수 모음 %%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%% 함수 모음 %%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%% 함수 모음 %%%%%%%%%%%%%%%%%%%%%%%%%%%

// % _filter
function _filter(list, predi) {
	let new_list = [];
	_each(list, function(item) {
    if (predi(item)) {
      new_list.push(item);
    }
	})
  return new_list;
}

// % _map
function _map(list, mapper) {
	let new_list = [];
	_each(list, function(item) {
		new_list.push(mapper(item));
	})
  return new_list;
}

// % _each
function _each(list, iter) {
	for (let i = 0; i < list.length; i++) {
		const item = list[i];
		iter(item);
	}
}


console.log('', document.querySelectorAll('*'));
document.querySelectorAll('*').map(function(v) {
	console.log('v', v);
}).bind([]);
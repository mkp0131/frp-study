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

// %%%%%%%%%%%%%%%%%%%%%%%%%%% 함수 모음 %%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%% 함수 모음 %%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%% 함수 모음 %%%%%%%%%%%%%%%%%%%%%%%%%%%

// % _filter
function _filter(list, predi) {
  let new_list = [];
  _each(list, function (item) {
    if (predi(item)) {
      new_list.push(item);
    }
  });
  return new_list;
}

// % _map
function _map(list, mapper) {
  let new_list = [];
  _each(list, function (item) {
    new_list.push(mapper(item));
  });
  return new_list;
}

// % _each
function _each(list, iter) {
  const keys = _keys(list);
  for (let i = 0; i < keys.length; i++) {
    const item = list[keys[i]];
    iter(item);
  }
}

// % _curry (인자를 다루는 기법 => 인자를 하나씩 수집하여 인자가 모두 수집되면 결과 값을 리턴)
function _curry(fn) {
  return function (a, b) {
    if (arguments.length == 2) return fn(a, b);
    return function (b) {
      return fn(a, b);
    };
  };
}

// % _curryr (인자를 반대로 적용 => 코드를 쉽게 이해하기 위해서 필요)
function _curryr(fn) {
  return function (a, b) {
    if (arguments.length == 2) return fn(a, b);
    return function (b) {
      return fn(b, a);
    };
  };
}

// % _get (obj에 있는 값을 안전하게 참조 why? => 자바스크립트에서 obj 의 참조값이 없는 값이 되면 error 를 생성한다.[뒤에 코드 실행안됨] / null 체크)
const _get = _curryr(function (obj, key) {
  if (obj === null) {
    return undefined;
  } else {
    return obj[key];
  }
});

// % _rest (list 를 잘라서 값을 반환 => 다형성)
function _rest(list, first, last) {
  const slice = Array.prototype.slice;
  if (!first) first = 1;
  list = slice.call(list, first, last);
  return list;
}

// % _reduce (축약된 자료를 생성)
function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    const slice = Array.prototype.slice;
    list = slice.call(list, 1);
  }
  _each(list, function (item) {
    memo = iter(memo, item);
  });
  return memo;
}

// % _pipe (함수를 순차적으로 실행하는 함수팩을 생성 리턴)
function _pipe() {
  const fns = arguments;
  return function (arg) {
    return _reduce(
      fns,
      function (memo, fn) {
        return fn(memo);
      },
      arg
    );
  };
}

// % _go (첫번째인자는 핸들해야하는 값, 두번째부터 함수를 인자로 받아 결과 값을 바로 리턴)
function _go(arg) {
  let fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

// % _is_object (object 인지 확인)
function _is_object(list) {
  return typeof list === "object" && !!list;
}

// % _keys (Object.keys 활용 => Object.kyes의 경우에는 Object, null 값이 들어오면 작동하지않음.)
function _keys(list) {
  if (_is_object(list)) {
    return Object.keys(list);
  } else {
    return [];
  }
}

// 30세 이상인 user의 name 을 수집
// result = fn1(5);
const get_age = _get("age");
const get_name = _get("name");

// ##### curryr 로 함수 사용을 간결하게 변경
_map = _curryr(_map);
_filter = _curryr(_filter);

// ### 테스트
_go(
  users[0],
  _map(function (v) {
    return v + "#";
  }),
  _map(function (v) {
    return v.toLowerCase();
  }),
  console.log
);

// console.log("", result(users[0]));

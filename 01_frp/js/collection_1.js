// 컬렉션 중심 프로그래밍의 4가지 유형과 함수

// 1. 수집하기 - map, values, pluck 등
// 2. 거르기 - filter, reject, compact, without 등
// 3. 찾아내기 - find, some, every 등
// 4. 접기 - reduce, min, max, group_by, count_by

// ########################
// 각유형의 대표함수를 통해서 특화함수를 생성
// ########################

// 1. 수집하기 - map
// 1.1 values (value 를 꺼내는 함수)
// function _values(list) {
//   return _map(list, _identity);
// }
const _values = _map(_identity);

// % _identity (들어온 값을 그대로 리턴)
function _identity(val) {
  return val;
}

// 1.2 pluck(뽑다)
function _pluck(list, key) {
  return _map(list, _get(key));
}

// % _negate
function _negate(fn) {
  return function (val) {
    return !fn(val);
  };
}

// 1. 거르기 - _filter
// 1.1 _reject
function _reject(list, predi) {
  return _filter(list, _negate(predi));
}

// 1.2 _compact (인자로 받은 값들중 true 인값만 arr 로 만들어 리턴)
// function _compact(list) {
//   return _filter(list, _identity);
// }
const _compact = _filter(_identity);

// ### 테스트
result = _compact([1, 2, 0, null, false, {}]);
console.log("", result);
// console.log("", result(users[0]));

function *flat (arr) {
  yield* arr;
}

var a = [1, [2, [3, 4], 5]];
for (var f of flat(a)) {
  console.log(f);
}

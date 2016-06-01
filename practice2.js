function *factorial(n) {
  var a, state = 1;

  yield (a = 1);
  state++;

  while (state <= n){
    yield (a = a * state);
    state++;
  }
}


for (var n of factorial(5)) {
  console.log(n);
}

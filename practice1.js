function *range (from, to) {
  while (from <= to){
    yield from++;
  }
}

for (var i of range(5, 10)){
  console.log(i);
}

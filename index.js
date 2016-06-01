// getters
let get = (object, property) =>
  object[property]

let getWith = (property) =>
  (object) => object[property]

let getFrom = (object) =>
  (property) => object[property]
}

// mappers
let map = (collection, fn) =>
  collection.map(fn);

let mapWith = (fn) =>
  (collection) => collection.map(fn);

let mapFrom = (collection) =>
  (fn) => collection.map(fn)

// pluckers (getters + mappers)
let pluck = (collection, property) {
  collection.map((obj) => obj[property]);
}

let pluckWith = (property) =>
  (collection) => pluck(collection, property);

let pluckFrom = (collection) =>
  (property) => pluck(collection, property);

// Decompositions
// get -> getWith or getFrom
// map -> mapWith or mapFrom
// pluck -> pluckWith or pluckFrom

// examples of .bind
let leftApply = (fn, a) =>
  (b) => fn(a, b);

let rightApply = (fn, b) =>
  (a) => fn(a, b);

// Identity Combinators
// leftApply(leftApply, leftApply)
let Istarstar = (a) => (b) => (c) => a(b,c);
let getFrom = Istarstar(get);
let mapFrom = Istarstar(map)
let pluckFrom = Istarstar(pluck);

// C Combinators
// leftApply(leftApply, rightApply)
let C = (a) => (b) => (c) => a(c,b);
let getWith = C(get);
let mapWith = C(map);
let pluckWith = C(pluck);

// Compositions
// We compose entities to make the relationships between thme explicit
let compose = (a, b) =>
  (c) => a(b(c));

let pluckWith = compose(mapWith, getWith);


// before makes the time relationship between two functions explicit
// compositions with before
// do this, before that
let before = (fn, decoration) =>
  (...args) => {
    decoration(...args);
    return fn(...args);
  }

// composition with after
let after = (fn, decoration) =>
  (...args) => {
    let returnValue = fn(...args);
    decoration(...args);
    return returnValue;
  }

// javaScript invocations are coloured
// coloured decorators

let before = (fn, decoration) =>
  function (...args) {
    decoration.apply(this, args);
    return fn.apply(this,args);
  };

let after = (fn, decoration) =>
  function (...args) {
    let returnValue = fn.apply(...args);
    decoration(...args);
    return returnValue;
  };

// classes can be decorated too (classes are expressions)

const decorateMethodWith = (decorator, ...methodNames) =>
  (clazz) => {
    for (let methodName of methodName) {
      const method = clazz.prototype[methodName];

      Object.defineProperty(clazz.prototype, methodName, {
        value: decorator(method),
        writable: true
      });
    }
    return clazz;
  }

  const beforeAll = (decorator, ...methodName) =>
    decorateMethodWith(method) => before(method, decorator,  ...methodname),

    afterALL = (decorator, ...methodName) =>
    decorateMethodWith(method => after(method, decorator, ...methodName);

// method decorators
let methodDecorator = (decorator) =>
  function (target, name, descriptor) {
    descriptor.value = decorator(descriptor.value);
  }

let invokeBefore = (methodName) =>
  methodDecorator (methodBody) =>
    before(methodBody, invoke(methodName))
  );

let invokeafter = (methodName) =>
  methodDecorator( (methodBody) =>
  after(methodBody, invoke(methodName))
)

function add(a, b) {
  return a + b;
}

function addPI(a) {
  return a + Math.PI;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  add,
  addPI,
  multiply,
};

var version = "1.0.0";

console.log("version: ", version);

console.log(add(1, 2));
console.log(addPI(1));

function foo() {
    if (Math.random() > 0.1 || true) {
        import('lodash-es').then(({ default: _ }) => {
            console.log(_.add(1, 2));
        });
    }
}

foo();

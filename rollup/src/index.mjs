import { add, addPI } from "./utils.mjs";
import { version } from "../../package.json" assert { type: "json" };

console.log("version: ", version);

console.log(add(1, 2));
console.log(addPI(1));

function foo() {
    if (Math.random() > 0.1 || true) {
        import('lodash-es').then(({ default: _ }) => {
            console.log(_.add(1, 2))
        })
    }
}

foo()

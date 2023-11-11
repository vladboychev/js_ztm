const assert = require("assert");
const { forEach, map } = require("./index");
const { it } = require("node:test");

// const test = (desc, fn) => {
//   console.log("----", desc);
//   try {
//     fn();
//   } catch (err) {
//     console.log(err.message);
//   }
// };

it("Test The ForEach Function", () => {
  let sum = 0;
  forEach([1, 2, 3], (value) => {
    sum += value;
  });

  assert.strictEqual(sum, 6, "Expected forEach to sum the array.");
});

it("Test The Map Function", () => {
  const result = map([1, 2, 3], (value) => {
    return value * 2;
  });

  assert.deepStrictEqual(result, [2, 4, 6]);
});

import utils from "../../src/utils/utils";

describe("utils sum function", () => {
  test("utils sum - adds 1 + 2 to equal 3", () => {
    expect(utils.sum(1, 2)).toBe(3);
  });
});

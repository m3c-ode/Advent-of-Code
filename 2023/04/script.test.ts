import { syncReadFile } from "../../utils/functions";
import { solve as solvePart1, solve2 as solvePart2 } from "./script";

const data = syncReadFile("2023/04/data.txt");
const testdata = syncReadFile("2023/04/testdata.txt");

describe("2023/04 - part 1", () => {
  test("Test data", () => {
    expect(solvePart1(testdata)).toBe(13);
  });
  test("Real input", () => {
    expect(solvePart1(data)).toBe(25651);
  });
});

describe("2023/04 - part 2", () => {
  test("Test data", () => {
    expect(solvePart2(testdata)).toBe(30);
  });
  test("Real input", () => {
    expect(solvePart2(data)).toBe(19499881);
  });
});

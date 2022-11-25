import gameboard from "./gameboard";

test("gameboard is a function", () => {
  expect(typeof gameboard).toBe("function");
});

let testBoard;

beforeAll(() => {
  testBoard = gameboard();
});

test("gameboard is setup as empty arrays", () => {
  expect(testBoard.board).toEqual([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);
});

test("gameboard can place a ship", () => {
  testBoard.placeShip(0, 0, 3, "vertical");
  expect(testBoard.board).toEqual([
    [expect.any(Object), null, null, null, null, null, null],
    [expect.any(Object), null, null, null, null, null, null],
    [expect.any(Object), null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);
});

test("gameboard can place a ship horizontally", () => {
    testBoard.placeShip(0, 1, 3, "horizontal");
    expect(testBoard.board).toEqual([
        [expect.any(Object), expect.any(Object), expect.any(Object), expect.any(Object), null, null, null],
        [expect.any(Object), null, null, null, null, null, null],
        [expect.any(Object), null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ]);
});

// test("ships can be hit", () => {
//   testBoard.hit(0, 0);
//   expect(testBoard.board[0][0].ship.hp()).toBe(2);
// });
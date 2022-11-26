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

test("gameboard can place a ship vertically", () => {
  testBoard.placeShip(0, 0, 3, "v");
  expect(testBoard.board[0][0]).not.toBeNull();
  expect(testBoard.board[1][0]).not.toBeNull();
  expect(testBoard.board[2][0]).not.toBeNull();
});

test("first ship has ID 0", () => {
  expect(testBoard.board[0][0].getID()).toBe(0);
});

test("gameboard can place a ship horizontally", () => {
    testBoard.placeShip(1, 0, 3, "h");
    expect(testBoard.board[0][1]).not.toBeNull();
    expect(testBoard.board[0][2]).not.toBeNull();
    expect(testBoard.board[0][3]).not.toBeNull();
});

test("second ship has ID 1", () => {
    expect(testBoard.board[0][1]).toEqual({
        getID: expect.any(Function),
        hp: expect.any(Function),
        hit: expect.any(Function),
        isSunk: expect.any(Function),
        });
    expect(testBoard.board[0][1].getID()).toBe(1);
    });

test("different ships have different IDs", () => {
    expect(testBoard.board[0][0].getID() == testBoard.board[0][1].getID()).toBe(false);
});

test("gameboard objects are ships", () => {
  expect(testBoard.board[0][0].hp()).toBe(3);
  expect(testBoard.board[0][0].isSunk()).toBe(false);
});

test("ships can be hit", () => {
  testBoard.hit(0, 0);
  expect(testBoard.board[0][0].hp()).toBe(2);
});

test("hitting a location adds it to hitSpots", () => {
  expect(testBoard.getHitSpots()).toContainEqual([0, 0]);
});

test("all ships of same ID are hit", () => {
  testBoard.hit(0, 1);
  expect(testBoard.board[0][0].hp()).toBe(1);
  expect(testBoard.board[1][0].hp()).toBe(1);
  expect(testBoard.board[2][0].hp()).toBe(1);
});

test("location can only be hit once", () => {
  expect(testBoard.getHitSpots()).toContainEqual([0, 0]);
  expect(() => testBoard.hit(0, 0)).toThrow('Location already hit');
  });

test("ships can be sunk", () => {
  testBoard.hit(0, 2);
  expect(testBoard.board[0][0].isSunk()).toBe(true);
  expect(testBoard.board[1][0].isSunk()).toBe(true);
  expect(testBoard.board[2][0].isSunk()).toBe(true);

});

test("sunk ships cannot be hit", () => {
  expect(() => testBoard.hit(0, 0)).toThrow('Location already hit');
  expect(() => testBoard.hit(0, 1)).toThrow('Location already hit');
  expect(() => testBoard.hit(0, 2)).toThrow('Location already hit');
});

test("gameboard properly checks if all ships are sunk", () => {
  testBoard.hit(1,0);
  testBoard.hit(2,0);
  testBoard.hit(3,0);
  expect(testBoard.allSunk()).toBe(true);
});
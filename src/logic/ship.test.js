import ship from "./ship";

let testShip;

beforeAll(async () => {
  testShip = ship(4);
});

test("ship is created with a length", () => {
  expect(testShip.hp()).toBe(4);
});

test("ship's health is reduced by 1 when hit", () => {
  testShip.hit();
  expect(testShip.hp()).toBe(3);
});

test("ship is sunk when health is 0", () => {
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});

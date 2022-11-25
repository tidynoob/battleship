import ship from './ship';

const gameboard = () => {
  const board = new Array(7).fill(null).map(() => new Array(7).fill(null));

  let _count = 0;

  const makeID = () => _count++;

  const placeShip = (x, y, length, direction) => {
    // check if there's already a ship there
    for (let i = 0; i < length; i++) {
      if (direction === 'vertical') {
        if (board[y + i][x] !== null) {
          return false;
        }
      } else if (direction === 'horizontal') {
        if (board[y][x + i] !== null) {
          return false;
        }
      }
    }
    // place the ship
    const ID = makeID();
    for (let i = 0; i < length; i++) {
      if (direction === 'vertical') {
        board[y + i][x] = ship(length, ID);
      } else if (direction === 'horizontal') {
        board[y][x + i] = ship(length, ID);
      }
    }
    return true;
  };

  return { board, placeShip };
};

export default gameboard;

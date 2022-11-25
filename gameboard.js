import ship from './ship';

const gameboard = () => {
  const board = new Array(7).fill(null).map(() => new Array(7).fill(null));

  let _count = 0;

  const _hitSpots = [];
  const _missedSpots = [];

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const getHitSpots = () => _hitSpots;

  const getMissedSpots = () => _missedSpots;

  const _makeID = () => _count++;

  const placeShip = (x, y, length, direction) => {
    // check if there's already a ship there
    for (let i = 0; i < length; i++) {
      if (direction === 'v') {
        if (board[y + i][x] !== null) {
          return false;
        }
      } else if (direction === 'h') {
        if (board[y][x + i] !== null) {
          return false;
        }
      }
    }
    // place the ship
    const ID = _makeID();
    for (let i = 0; i < length; i++) {
      if (direction === 'v') {
        board[y + i][x] = ship(length, ID);
      } else if (direction === 'h') {
        board[y][x + i] = ship(length, ID);
      } else {
        return false;
      }
    }
    return true;
  };

  const hit = (x, y) => {
    if (_missedSpots.some((spot) => arraysEqual(spot, [x, y]))) {
      throw new Error('Location already missed');
    }
    if (board[y][x] === null) {
      _missedSpots.push([x, y]);
      throw new Error('No ship at that location');
    }

    if (_hitSpots.some((spot) => arraysEqual(spot, [x, y]))) {
      throw new Error('Location already hit');
    }
    const ID = board[y][x].getID();
    board.map((row) => row.map((cell) => {
      if (cell !== null && cell.getID() === ID) {
        cell.hit();
      }
      return cell;
    }));
    _hitSpots.push([x, y]);
    return true;
  };

  const allSunk = () => board.every((row) => row.every((cell) => cell === null || cell.isSunk()));

  return {
    board, placeShip, hit, getHitSpots, getMissedSpots, allSunk,
  };
};

export default gameboard;

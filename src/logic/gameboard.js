import ship from './ship';

const gameboard = () => {
  const board = new Array(7).fill(null).map(() => new Array(7).fill(null));

  const _hitSpots = [];
  const _missedSpots = [];
  const _filledSpots = [];

  const _shipCount = {
    carrier: {
      length: 5,
      max: 1,
      count: 0,
    },
    battleship: {
      length: 4,
      max: 1,
      count: 0,
    },
    submarine: {
      length: 3,
      max: 1,
      count: 0,
    },
    destroyer: {
      length: 2,
      max: 2,
      count: 0,
    },
  };

  let _count = _shipCount.carrier.count
    + _shipCount.battleship.count
    + _shipCount.submarine.count
    + _shipCount.destroyer.count;

  const allShipsPlaced = () => _count === 5;

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const getShipCount = () => _shipCount;

  const getHitSpots = () => _hitSpots;

  const getMissedSpots = () => _missedSpots;

  const getFilledSpots = () => _filledSpots;

  const _makeID = () => _count++;

  const isShipPlacable = (x, y, length, direction) => {
    if (direction === 'h') {
      if (x + length > 6) return false;
      for (let i = 0; i < length; i++) {
        if (board[y][x + i] !== null) return false;
      }
    } else if (direction === 'v') {
      if (y + length > 6) return false;
      for (let i = 0; i < length; i++) {
        if (board[y + i][x] !== null) return false;
      }
    }
    return true;
  };



  const placeShip = (x, y, length, direction) => {
    // check if there's already a ship there
    for (let i = 0; i < length; i++) {
      if (direction === 'v') {
        if (board[y + i][x] !== null) {
          console.log(x, y + i);
          console.log('error');

          return false;
        }
      } else if (direction === 'h') {
        if (board[y][x + i] !== null) {
          console.log(x, y + i);

          console.log('error');

          return false;
        }
      }
    }
    // place the ship
    const ID = _makeID();
    for (let i = 0; i < length; i++) {
      if (direction === 'v') {
        board[y + i][x] = ship(length, ID);
        _filledSpots.push([x, y + i]);
      } else if (direction === 'h') {
        board[y][x + i] = ship(length, ID);
        _filledSpots.push([x + i, y]);
      } 
    }
    console.log(board);
    return board;
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

  const resetBoard = () => {
    _count = 0;
    _hitSpots.length = 0;
    _missedSpots.length = 0;
    board.forEach((row) => row.fill(null));
  };

  return {
    board, placeShip, hit, getHitSpots, getMissedSpots, getFilledSpots, allSunk, resetBoard, getShipCount, allShipsPlaced, isShipPlacable
  };
};

export default gameboard;

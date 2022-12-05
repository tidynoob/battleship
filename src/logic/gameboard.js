import ship from './ship';

const gameboard = () => {
  const board = new Array(7).fill(null).map(() => new Array(7).fill(null));


  let _count = 0;
  const _hitSpots = [];
  const _missedSpots = [];
  const _filledSpots = [];

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

  const getFilledSpots = () => _filledSpots;

  const getGuessableSpots = () => {
    const guessableSpots = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (_missedSpots.some((spot) => arraysEqual(spot, [j, i]))) continue;
        if (_hitSpots.some((spot) => arraysEqual(spot, [j, i]))) continue;
        guessableSpots.push([j, i]);
      }
    }
    return guessableSpots;
  }

  const _makeID = () => _count++;

  const isShipPlacable = (x, y, length, direction) => {
    if (direction === 'h') {
      if (x + length > 7) return false;
      for (let i = 0; i < length; i++) {
        // console.log('spot: ', x + i, y);
        // console.log('value: ', board[y][x + i]);
        if (board[y][x + i] !== null) return false;
      }
    } else if (direction === 'v') {
      if (y + length > 7) return false;
      for (let i = 0; i < length; i++) {
        // console.log('spot: ', x, y + i);
        // console.log('value: ', board[y + i][x]);
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
          // console.log(x, y + i);
          console.log('error');

          return false;
        }
      } else if (direction === 'h') {
        if (board[y][x + i] !== null) {
          // console.log(x, y + i);

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
    // console.log(board);
    return board;
  };

  const hit = (x, y) => {
    if (_missedSpots.some((spot) => arraysEqual(spot, [x, y]))) {
      return board;
    }
    if (board[y][x] === null) {
      _missedSpots.push([x, y]);
      return board;
    }

    if (_hitSpots.some((spot) => arraysEqual(spot, [x, y]))) {
      return board;
    }
    const ID = board[y][x].getID();
    board.map((row) => row.map((cell) => {
      if (cell !== null && cell.getID() === ID) {
        cell.hit();
      }
      return cell;
    }));
    _hitSpots.push([x, y]);
    return board;
  };

  const allSunk = () => {
    let sunk = true;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== null && !cell.isSunk()) {
          sunk = false;
        }
      });
    });
    return sunk;
  };

  const resetBoard = () => {
    _hitSpots.length = 0;
    _missedSpots.length = 0;
    board.forEach((row) => row.fill(null));
  };

  return {
    board, placeShip, hit, getHitSpots, getMissedSpots, getFilledSpots, allSunk, resetBoard, isShipPlacable, getGuessableSpots
  };
};

export default gameboard;

import player from './player';

let player1;
let player2;

beforeAll(() => {
    console.log('Before all tests');
    player1 = player('Mitch', 'user');
    player2 = player('Computer', 'computer');

});

test('player has a name', () => {
    expect(player1.getName()).toBe('Mitch');
});

test('player has a type', () => {
    expect(player1.getType()).toBe('user');
});

test('each player has a board', () => {
    expect(player1.gameBoard).not.toBeNull();
    expect(player2.gameBoard).not.toBeNull();
});

test('player can place ship on their board', () => {
    player1.gameBoard.placeShip(0, 0, 3, 'h');
    expect(player1.gameBoard.board[0][0]).not.toBeNull();
    expect(player1.gameBoard.board[0][1]).not.toBeNull();
    expect(player1.gameBoard.board[0][2]).not.toBeNull();
});

test('player can attack another player', () => {
    expect(() => player1.attack(player2, 0, 0)).toThrow();
    expect(player2.gameBoard.getMissedSpots()).toContainEqual([0, 0]);
    player2.attack(player1, 0, 0);
    expect(player1.gameBoard.getHitSpots()).toContainEqual([0, 0]);
});
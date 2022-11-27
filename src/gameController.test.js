import gameController from './gameController';

let game;

beforeAll(() => {
    console.log('Before all tests');
    game = gameController();
});

test('Starting Game initializes players', () => {
    game = gameController();
    game.startGame();
    expect(game.player1).not.toBeNull();
    expect(game.player2).not.toBeNull();
});


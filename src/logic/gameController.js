import player from './player';

const gameController = () => {
    let player1;
    let player2;

    let turnCount = 0;
    let gameActive = false;
    let playerTurn = (turnCount % 2 === 0) ? player1 : player2;

    const takeTurn = (x,y) => {
        if (turnCount % 2 === 0) {
            player1.attack(player2, x, y);
        } else {
            player2.attack(player1, x, y);
        };
        turnCount++;
    };


    const startGame = () => {
        console.log('Starting game');
        player1 = player('Player 1', 'user');
        player2 = player('Player 2', 'user');

        
    }



};

export default gameController;
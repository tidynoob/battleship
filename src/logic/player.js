import gameboard from "./gameboard";

const player = (playerName, type = 'user') => {
    const _name = playerName;
    const _type = type;
    const gameBoard = gameboard();
    const getName = () => _name;
    const getType = () => _type;
    const attack = (enemy, x, y) => {
        enemy.gameBoard.hit(x, y);
    };

    return { getName, getType, gameBoard, attack };
}

export default player;
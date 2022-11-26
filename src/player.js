import gameboard from "./gameboard";

const player = (playerName, type = 'user') => {
    const _name = playerName;
    const _type = type;
    let gameBoard = gameboard();
    const getName = () => _name;
    const getType = () => _type;

    return { getName, getType, gameBoard };
}

export default player;
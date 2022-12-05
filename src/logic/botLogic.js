const bot = () => {

    const makeGuess = (guessableSpots) => {
        const randomIndex = Math.floor(Math.random() * guessableSpots.length);
        return guessableSpots[randomIndex];
    }

    const placeShips = (shipsList, board) => {
        for (let i = 0; i < shipsList.length; i++) {
            const ship = shipsList[i];
            console.log('new length: ', ship.length);

            let x = Math.floor(Math.random() * 8);
            let y = Math.floor(Math.random() * 8);
            let direction = Math.floor(Math.random() * 2) === 0 ? 'h' : 'v';
            
            while (!board.isShipPlacable(x, y, ship.length, direction)) {
                x = Math.floor(Math.random() * 8);
                y = Math.floor(Math.random() * 8);
                direction = Math.floor(Math.random() * 2) === 0 ? 'h' : 'v';
            }
            board.placeShip(x, y, ship.length, direction);

        }

    }

    return ({
        makeGuess,
        placeShips
    })
}

export default bot;
import React, {useState} from "react";
import { Box, Button, Heading, useBoolean } from "@chakra-ui/react";
import uniqid from 'uniqid';
// import gameController from "../logic/gameController";
// import { useDrop } from "react-dnd";
import player from "../logic/player";
import BattleShipGrid from "./BattleshipGrid";
import UserBox from "./UserBox";
import Ship from "./Ship";

function SubmitShipPlacement({gamePhase, ...other}) {
    if (gamePhase === 'placement') {
        return (
            <Button {...other} variant="solid" colorScheme="gray" w='250px'>Submit Ship Placement</Button>
        )
    }
    return null
}

function Main() {
    const [gameStatus, setGameStatus] = useState('');
    const [startButtonDisabled, setStartButtonDisabled] = useBoolean();
    const [resetButtonDisabled, setResetButtonDisabled] = useBoolean(true);
    // const [submitShipsButtonDisabled, setSubmitShipsButtonDisabled] = useBoolean(true);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('Computer');
    const [turnCount, setTurnCount] = useState(0);
    const [gamePhase, setGamePhase] = useState('pregame');
    const [playerTurn, setPlayerTurn] = useState('');
    const [rotation, setRotation] = useState('h');
    const [shipsList, setShipsList] = useState([5,4,3,3,2]);

    if (player1 !== null) {
        console.log(player1.gameBoard.board);
    };

    const takeTurn = (x,y) => {
        if (gamePhase !== 'active') return;
        if (playerTurn === 'player1') {
            player1.attack(player2, x, y);
        } else {
            player2.attack(player1, x, y);
        };
        setTurnCount(turnCount + 1);
        if (turnCount % 2 === 0) {
            setPlayerTurn('player1');
        } else {
            setPlayerTurn('player2');
        };
    };

    const startGame = () => {
        setPlayer1(player(player1Name, 'user'));
        setPlayer2(player('Computer', 'bot'));
        setGamePhase('placement');
        setGameStatus('Place Ships');
        setStartButtonDisabled.on();
        setResetButtonDisabled.off();
    };

    const resetGame = () => {
        setGamePhase('pregame');
        setGameStatus('Game has been reset');
        setPlayer1({});
        setPlayer2({});
        setStartButtonDisabled.off();
        setResetButtonDisabled.on();
    };

    const submitShips = () => {
        if (!player1.board.allShipsPlaced() || !player2.board.allShipsPlaced()) {
            return;
        }
        setGamePhase('active');
        setPlayerTurn(player1Name);
        setGameStatus(`${playerTurn}'s turn`);
    };

    const handleTileClick = (e) => {
        const x = e.target.getAttribute('data-x');
        const y = e.target.getAttribute('data-y');
        
        if (gamePhase === 'active') {
            takeTurn(x,y);
            setGameStatus(`${playerTurn}'s turn`);
            return
        };
    };

    const toggleRotation = () => {
        if (rotation === 'h') {
            setRotation('v');
        } else {
            setRotation('h');
        };
    };

    return (
        <Box display='grid' gridTemplateColumns="350px 350px" p={4} gap='4' gridAutoRows="auto" maxW="container.lg" alignItems="center" margin="auto" >
            <Button justifySelf="flex-end" colorScheme="gray" variant="solid" w='250px' onClick={startGame} isDisabled={startButtonDisabled}>Start</Button>
            <Button justifySelf="flex-start" colorScheme="gray" variant="outline" w='250px' onClick={resetGame} isDisabled={resetButtonDisabled}>Reset</Button>
            <UserBox justifySelf='center' gridColumn='1' playerName={player1Name} setPlayerName={setPlayer1Name} gamePhase={gamePhase} />
            <Heading justifySelf="center" gridColumn="2" size="md">Computer</Heading>
            <BattleShipGrid rotation={rotation} playerTurn={playerTurn} handleTileClick={handleTileClick} setPlayer={setPlayer1} player={player1} playerName={player1Name} gridColumn='1' gamePhase={gamePhase} />
            <BattleShipGrid playerTurn={playerTurn} handleTileClick={handleTileClick} player='Computer' gridColumn='2' gamePhase={gamePhase}/>
            <Heading justifySelf="center" gridColumn="1/-1" size='lg'>{gameStatus}</Heading>
            {gamePhase === 'placement' && 
                <>
                <Button justifySelf="center" gridColumn="1/-1" variant="outline" colorScheme="gray" w='250px' onClick={toggleRotation}>Rotate</Button>
                <Box justifySelf="center" justifyContent="center" alignItems="flex-start" gridColumn="1/-1" display="flex" flexDirection={(rotation === 'h' ? 'column' : 'row')} gap="4">
                {shipsList.map((ship) => (
                <Ship key={uniqid()} length={ship} dir={rotation} player={player1Name} />
                ))}
                </Box>
                </>
            }
            {/* <SubmitShipPlacement justifySelf='center' gridColumn='1/-1' gamePhase={gamePhase}/> */}

        </Box>
    )
}

export default Main;
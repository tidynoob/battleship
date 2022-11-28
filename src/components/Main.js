import React, {useState} from "react";
import { Box, Button, Heading, useBoolean } from "@chakra-ui/react";
import uniqid from 'uniqid';
// import gameController from "../logic/gameController";
import player from "../logic/player";
import BattleShipGrid from "./BattleshipGrid";
import UserBox from "./UserBox";

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
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [player1Name, setPlayer1Name] = useState('');
    const [turnCount, setTurnCount] = useState(0);
    const [gamePhase, setGamePhase] = useState('');
    const [playerTurn, setPlayerTurn] = useState('');

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
        setGamePhase('placement');
        setGameStatus('Place Ships');
        setPlayer1(player(player1Name, 'user'));
        setPlayer2(player('Computer', 'bot'));
        setStartButtonDisabled.on();
        setResetButtonDisabled.off();
    };

    const resetGame = () => {
        setGamePhase('');
        setGameStatus('Game has been reset');
        setPlayer1({});
        setPlayer2({});
        setStartButtonDisabled.off();
        setResetButtonDisabled.on();
    };

    const submitShips = () => {
        if (!player1.allShipsPlaced() || !player2.allShipsPlaced()) {
            return;
        }
        setGamePhase('active');
        setPlayerTurn('player1');
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

    return (
        <Box display='grid' gridTemplateColumns="350px 350px" p={4} gap='4' gridAutoRows="auto" maxW="container.lg" alignItems="center" margin="auto" >
            <Button justifySelf="flex-end" colorScheme="gray" variant="solid" w='250px' onClick={startGame} isDisabled={startButtonDisabled}>Start</Button>
            <Button justifySelf="flex-start" colorScheme="gray" variant="outline" w='250px' onClick={resetGame} isDisabled={resetButtonDisabled}>Reset</Button>
            <UserBox justifySelf='center' gridColumn='1' playerName={player1Name} setPlayerName={setPlayer1Name} gamePhase={gamePhase} />
            <Heading justifySelf="center" gridColumn="2" size="md">Computer</Heading>
            <BattleShipGrid playerTurn={playerTurn} handleTileClick={handleTileClick} player='player1' gridColumn='1' />
            <BattleShipGrid playerTurn={playerTurn} handleTileClick={handleTileClick} player='player2' gridColumn='2' />
            <Heading justifySelf="center" gridColumn="1/-1" size='lg'>{gameStatus}</Heading>
            <SubmitShipPlacement justifySelf='center' gridColumn='1/-1' gamePhase={gamePhase}/>

        </Box>
    )
}

export default Main;
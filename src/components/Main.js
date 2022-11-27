import React, {useState} from "react";
import { Box, Button, Heading, useBoolean } from "@chakra-ui/react";
import uniqid from 'uniqid';
// import gameController from "../logic/gameController";
import player from "../logic/player";

function SubmitShipPlacement({gamePhase}) {
    console.log(gamePhase);
    if (gamePhase === 'placement') {
        return (
            <Button variant="solid" colorScheme="gray" w='250px'>Submit Ship Placement</Button>
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
    const [turnCount, setTurnCount] = useState(0);
    const [gamePhase, setGamePhase] = useState('');
    const [playerTurn, setPlayerTurn] = useState('');

    const takeTurn = (x,y) => {
        if (gamePhase !== 'active') return;
        if (playerTurn() === 'player1') {
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
        setGameStatus('Place Ships');
        setPlayer1(player('Player 1', 'user'));
        setPlayer2(player('Computer', 'bot'));
        setGamePhase('placement');
        setStartButtonDisabled.on();
        setResetButtonDisabled.off();
    };

    const resetGame = () => {
        setGamePhase('Game has been reset');
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


    const highlightBoard = (user) => {
        if (user === null) return '1px';
        if (playerTurn === user) {
            return '5px'
        } 
            return '1px'
        
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

    const boardArray = [ 
        ['00', '10', '20', '30', '40', '50', '60'],
        ['01', '11', '21', '31', '41', '51', '61'],
        ['02', '12', '22', '32', '42', '52', '62'],
        ['03', '13', '23', '33', '43', '53', '63'],
        ['04', '14', '24', '34', '44', '54', '64'],
        ['05', '15', '25', '35', '45', '55', '65'],
        ['06', '16', '26', '36', '46', '56', '66'],
    ];

    const setupBoard = boardArray.map((row, yIndex) => {

        const rowArray = row.map((cell,xIndex) => <Box 
            key={uniqid()} 
            data-x={xIndex} 
            data-y={yIndex} 
            onClick={handleTileClick}
            w='50px' 
            h="50px" 
            borderWidth="1px" 
            borderColor="gray.900"/>);

        return (
            <Box key={uniqid()} display='flex' justifyContent='space-between'>
                {rowArray}
            </Box>
        )

    });



    return (
        <Box display='flex' flexDirection='column' alignItems='center' p={4} gap='4' >
            <Box display="flex" gap='4' >
                <Button colorScheme="gray" variant="solid" w='250px' onClick={startGame} isDisabled={startButtonDisabled}>Start</Button>
                <Button colorScheme="gray" variant="outline" w='250px' onClick={resetGame} isDisabled={resetButtonDisabled}>Reset</Button>
            </Box>
            <Box display='flex' alignItems="center" justifyContent='space-evenly' gap="4" >
                <Box id="player1" display='flex' flexDirection='column' alignItems='center' borderWidth={highlightBoard(player1)} borderColor="gray.900" shadow="base">
                    {setupBoard}
                </Box>
                <Box id="player2" display='flex' flexDirection='column' alignItems='center' borderWidth={highlightBoard(player2)} borderColor="gray.900" shadow='base'>
                    {setupBoard}
                </Box>
            </Box>
            <Heading size='lg'>{gameStatus}</Heading>
            <SubmitShipPlacement gamePhase={gamePhase}/>

        </Box>
    )
}

export default Main;
import React, {useState, useEffect} from "react";
import { Box, Button, Heading, useBoolean, useDisclosure } from "@chakra-ui/react";
// import uniqid from 'uniqid';
// import gameController from "../logic/gameController";
import player from "../logic/player";
import BattleShipGrid from "./BattleshipGrid";
// import UserBox from "./UserBox";
import PlacementModal from "./PlacementModal";
import bot from "../logic/botLogic";

const shipList = [
    {
        shipName: 'carrier',
        length: 5,
    },
    {
        shipName: 'battleship',
        length: 4,
    },
    {
        shipName: 'submarine',
        length: 3,
    },
    {
        shipName: 'destroyer',
        length: 2,
    },
    {
        shipName: 'destroyer',
        length: 2,
    }
]

const computer = bot();

function Main() {
    const [player1, setPlayer1] = useState(player('Player'));
    const [player2, setPlayer2] = useState(player('Computer'));
    const [gamePhase, setGamePhase] = useState('placement');
    const [turnCount, setTurnCount] = useState(0);
    const [playerTurn, setPlayerTurn] = useState('');
    const [rotation, setRotation] = useState('h');
    const { isOpen, onOpen, onClose } = useDisclosure({isOpen: true});
    const [shipIndex, setShipIndex] = useState(0);

    const checkWinner = () => {
        if (player1.gameBoard.allSunk()) {
            return player2.getName();
        } 
        if (player2.gameBoard.allSunk()) {
            return player1.getName();
        } 
        return null;
        
    };

    const takeTurn = (x,y) => {
        if (gamePhase !== 'active') return;
        if (playerTurn === player1.getName()) {
            const newBoard = player1.attack(player2, x, y);
            setPlayer2({ ...player2, gameBoard: { ...player2.gameBoard, board: newBoard } });
        } else {
            const newBoard = player2.attack(player1, x, y);
            setPlayer1({ ...player1, gameBoard: { ...player1.gameBoard, board: newBoard } });

        };
        setTurnCount(tc => tc + 1);
    };

    useEffect(() => {
        const pt = turnCount % 2 === 0 ? player1.getName() : player2.getName();
        setPlayerTurn(pt);

        if (gamePhase === 'active') {
            const winner = checkWinner();
            // console.log(winner);
            if (winner !== null) {
                // console.log(winner, 'wins!');
                setGamePhase('over');
                onOpen();
            }
        }


    }, [turnCount]);

    useEffect(() => {
        if (playerTurn === player2.getName()) {
            const [x,y] = computer.makeGuess(player1.gameBoard.getGuessableSpots());
            setTimeout(() => takeTurn(x,y), 500);
        }
    }, [playerTurn]);

    const toggleRotation = () => {
        if (rotation === 'h') {
            setRotation('v');
        } else {
            setRotation('h');
        }
    };

    const startGame = () => {
        onClose();
        setPlayer2({ ...player2, gameBoard: { ...player2.gameBoard, board: computer.placeShips(shipList, player2.gameBoard) } });
        setGamePhase('active');
        setPlayerTurn(player1.getName());
        onClose();
    };

    const resetGame = () => {
        setPlayer1(player('Player 1'));
        setPlayer2(player('Computer'));
        setGamePhase('placement');
        setTurnCount(0);
        setPlayerTurn('');
        setRotation('h');
        setShipIndex(0);
        onOpen();
    };

    const handleTileClick = (e, user) => {
        const x = parseInt(e.target.getAttribute('data-x'), 10);
        const y = parseInt(e.target.getAttribute('data-y'), 10);

        if (gamePhase === 'active') {
            if (user.getName() !== playerTurn) {
                takeTurn(x,y);
            }
            return
        };

        if (gamePhase === 'placement') {
            // console.log(player1.gameBoard.board)
            if (!player1.gameBoard.isShipPlacable(x, y, shipList[shipIndex].length, rotation)) {
                return
            }

            const newBoard = player1.gameBoard.placeShip(x, y, shipList[shipIndex].length, rotation);
            setPlayer1({...player1, gameBoard: {...player1.gameBoard, board: newBoard}});
            setShipIndex(shipIndex + 1);

            if (shipIndex >= shipList.length - 1) {
                // console.log('game starting');
                startGame();
            }

        }
    };

    return (
        <>
        <PlacementModal currShip={shipList[shipIndex]} gamePhase={gamePhase}  isOpen={isOpen} onClose={onClose} rotation={rotation} toggleRotation={toggleRotation} handleTileClick={handleTileClick} player={player1} resetGame={resetGame} />
        <Box display='grid' gridTemplateColumns="350px 350px" p={4} gap='4' gridAutoRows="auto" maxW="container.lg" alignItems="center" margin="auto" >
            {/* <Button justifySelf="flex-end" colorScheme="gray" variant="solid" w='250px' onClick={startGame} isDisabled={startButtonDisabled}>Start</Button> */}
            {/* <Button justifySelf="flex-start" colorScheme="gray" variant="outline" w='250px' onClick={resetGame} isDisabled={resetButtonDisabled}>Reset</Button> */}
            <Heading justifySelf="center" gridColumn="1" size="md">{player1.getName()}</Heading>
            <Heading justifySelf="center" gridColumn="2" size="md">{player2.getName()}</Heading>
            <BattleShipGrid currShip={shipList[shipIndex]} gamePhase={gamePhase} rotation={rotation} playerTurn={playerTurn} handleTileClick={handleTileClick} player={player1} gridColumn='1' h='sm' w='sm' justifySelf='flex-end' />
            <BattleShipGrid currShip={shipList[shipIndex]} gamePhase={gamePhase} rotation={rotation} playerTurn={playerTurn} handleTileClick={handleTileClick} player={player2} gridColumn='2' h='sm' w='sm' justifySelf='flex-start' />
            {/* <Heading justifySelf="center" gridColumn="1/-1" size='lg'>{gameStatus}</Heading> */}

        </Box>
        </>
    )
}

export default Main;
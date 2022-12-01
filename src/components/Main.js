import React, {useState, useEffect} from "react";
import { Box, Button, Heading, useBoolean, useDisclosure } from "@chakra-ui/react";
import uniqid from 'uniqid';
// import gameController from "../logic/gameController";
import player from "../logic/player";
import BattleShipGrid from "./BattleshipGrid";
import UserBox from "./UserBox";
import PlacementModal from "./PlacementModal";

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

function Main() {
    const [gameStatus, setGameStatus] = useState('');
    const [resetButtonDisabled, setResetButtonDisabled] = useBoolean(true);
    const [player1, setPlayer1] = useState(player('Player 1'));
    const [player2, setPlayer2] = useState(player('Computer'));
    // const [player1Name, setPlayer1Name] = useState();
    // const [turnCount, setTurnCount] = useState(0);
    const [gamePhase, setGamePhase] = useState('placement');
    const [playerTurn, setPlayerTurn] = useState('');
    const [rotation, setRotation] = useState('h');
    const { isOpen, onOpen, onClose } = useDisclosure({isOpen: true});
    // const [shipList, setShipList] = useState(ships);
    const [shipIndex, setShipIndex] = useState(0);

    // console.log(gameStatus)
    // console.log(playerTurn);

    useEffect(() => {
        if (gamePhase === 'active') {
            setGameStatus(`${playerTurn}'s turn`);
        } else if (gamePhase === 'gameOver') {
            setGameStatus(`${playerTurn} wins!`);
        }
    }, [gamePhase, playerTurn])

    const toggleRotation = () => {
        if (rotation === 'h') {
            setRotation('v');
        } else {
            setRotation('h');
        }
    };

    const startGame = async () => {
        onClose();
        setGamePhase('active');
        setPlayerTurn(player1.getName());
        setGameStatus(`${playerTurn}'s turn`);
        setResetButtonDisabled.off();
        onClose();
    };

    // const takeTurn = (x,y) => {
    //     if (gamePhase !== 'active') return;
    //     if (playerTurn === player1.getName()) {
    //         player1.attack(player2, x, y);
    //     } else {
    //         player2.attack(player1, x, y);
    //     };
    //     setTurnCount(turnCount + 1);
    //     if (turnCount % 2 === 0) {
    //         setPlayerTurn(player1.getName());
    //     } else {
    //         setPlayerTurn(player2.getName());
    //     };
    // };

    const handleTileClick = (e) => {
        const x = parseInt(e.target.getAttribute('data-x'), 10);
        const y = parseInt(e.target.getAttribute('data-y'), 10);
        // console.log(x,y);

        
        if (gamePhase === 'active') {
            // takeTurn(x,y);
            setGameStatus(`${playerTurn}'s turn`);
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
                console.log('game starting');
                startGame();
            }

        }
    };

    // const hoverTile = (e) => {
    //     const x = e.target.getAttribute('data-x');
    //     const y = e.target.getAttribute('data-y');

    // };



    return (
        <>
        {gamePhase === 'placement' && <PlacementModal currShip={shipList[shipIndex]} gamePhase={gamePhase}  isOpen={isOpen} onClose={onClose} rotation={rotation} toggleRotation={toggleRotation} handleTileClick={handleTileClick} player={player1} />}
        <Box display='grid' gridTemplateColumns="350px 350px" p={4} gap='4' gridAutoRows="auto" maxW="container.lg" alignItems="center" margin="auto" >
            {/* <Button justifySelf="flex-end" colorScheme="gray" variant="solid" w='250px' onClick={startGame} isDisabled={startButtonDisabled}>Start</Button> */}
            {/* <Button justifySelf="flex-start" colorScheme="gray" variant="outline" w='250px' onClick={resetGame} isDisabled={resetButtonDisabled}>Reset</Button> */}
            <Heading justifySelf="center" gridColumn="1" size="md">{player1.getName()}</Heading>
            <Heading justifySelf="center" gridColumn="2" size="md">{player2.getName()}</Heading>
            <BattleShipGrid currShip={shipList[shipIndex]} gamePhase={gamePhase} rotation={rotation} playerTurn={playerTurn} handleTileClick={handleTileClick} player={player1} gridColumn='1' h='sm' w='sm' justifySelf='flex-end' />
            <BattleShipGrid currShip={shipList[shipIndex]} gamePhase={gamePhase} rotation={rotation} playerTurn={playerTurn} handleTileClick={handleTileClick} player={player2} gridColumn='2' h='sm' w='sm' justifySelf='flex-start' />
            <Heading justifySelf="center" gridColumn="1/-1" size='lg'>{gameStatus}</Heading>

        </Box>
        </>
    )
}

export default Main;
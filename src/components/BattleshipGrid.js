import React from "react";
import { Box } from "@chakra-ui/react";
import uniqid from 'uniqid';
import { useDrop } from "react-dnd";

const boardArray = [ 
    ['00', '10', '20', '30', '40', '50', '60'],
    ['01', '11', '21', '31', '41', '51', '61'],
    ['02', '12', '22', '32', '42', '52', '62'],
    ['03', '13', '23', '33', '43', '53', '63'],
    ['04', '14', '24', '34', '44', '54', '64'],
    ['05', '15', '25', '35', '45', '55', '65'],
    ['06', '16', '26', '36', '46', '56', '66'],
];

function GridCell({x, y, player, handleTileClick, setPlayer, ...other}) {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "ship",
        canDrop: (item) => {
            if (!player.gameBoard.isPlacable(x, y, item.length, item.dir)) return false;
            return true;
        },
        drop: (item, monitor) => {
            if (monitor.canDrop(item)) {
                setPlayer({...player, gameBoard: {...player.gameBoard, board: player.gameBoard.placeShip(x, y, item.length, item.dir)}}); 
            console.log(item, 'dropped at', x, y);
            }

        },

        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    return (
        <Box 
            ref={drop}
            data-x={x} 
            data-y={y} 
            onClick={handleTileClick}
            w='50px' 
            h="50px" 
            borderWidth="1px" 
            borderColor="gray.900"
            bg={(isOver && canDrop) ? 'green.300' : (isOver && !canDrop) ? 'red.300' : 'white'}
            {...other}
            />
    )
};



function BattleshipGrid({rotation, playerTurn, handleTileClick, setPlayer, player, playerName, gamePhase, ...other}) {

    const setupBoard = boardArray.map((row, yIndex) => {

        const rowArray = row.map((cell,xIndex) => {
            const cellID = uniqid();
            return (
                <GridCell 
                    key={cellID} 
                    x={xIndex} 
                    y={yIndex} 
                    rotation={rotation}
                    player={player}
                    setPlayer={setPlayer}
                    handleTileClick={handleTileClick}
                    />
            )

        })

        return (
            <Box key={uniqid()} display='flex' justifyContent='space-between'>
                {rowArray}
            </Box>
        )

    });

    const highlightBoard = (user) => {
        if (user === null) return '1px';
        if (gamePhase === 'pregame') return '1px';
        if (playerTurn === user) {
            return '5px'
        } 
            return '1px'
        
    };

    return (
        <Box id={playerName} display='flex' flexDirection='column' alignItems='center' borderWidth={highlightBoard(playerName)} borderColor="gray.900" shadow="base" {...other}>
            {setupBoard}
        </Box>

    )
};

export default BattleshipGrid;
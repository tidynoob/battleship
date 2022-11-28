import React from "react";
import { Box } from "@chakra-ui/react";
import uniqid from 'uniqid';

function BattleshipGrid({playerTurn, handleTileClick, player, ...other}) {

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

    const highlightBoard = (user) => {
        if (user === null) return '1px';
        if (playerTurn === user) {
            return '5px'
        } 
            return '1px'
        
    };

    return (
        <Box id={player} display='flex' flexDirection='column' alignItems='center' borderWidth={highlightBoard(player)} borderColor="gray.900" shadow="base" {...other}>
            {setupBoard}
        </Box>

    )
};

export default BattleshipGrid;
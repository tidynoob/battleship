import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import uniqid from 'uniqid';

function Main(props) {
    const {gameStatus} = props;

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

        const rowArray = row.map((cell,xIndex) => <Box key={uniqid()} datatype={`${xIndex},${yIndex}`} w='25px' h="25px" border='1px' />);

        return (
            <Box key={uniqid()} display='flex' justifyContent='space-between'>
                {rowArray}
            </Box>
        )

    });


    return (
        <Box display='flex' flexDirection='column' alignItems='center' p={4} >
            <Heading size='lg'>{gameStatus}</Heading>
            <Box display='flex' alignItems="center" justifyContent='space-evenly' p='4' gap="4">
                <Box id="player1" display='flex' flexDirection='column' alignItems='center'>
                    {setupBoard}
                </Box>
                <Box id="player2" display='flex' flexDirection='column' alignItems='center'>
                    {setupBoard}
                </Box>
            </Box>
        </Box>
    )
}

export default Main;
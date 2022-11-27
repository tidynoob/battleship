import React from "react";
import { Box, Heading } from "@chakra-ui/react";

function Main(props) {
    const {gameStatus} = props;

    return (
        <Box display='flex' flexDirection='column' alignItems='center' p={4} >
            <Heading size='lg'>{gameStatus}</Heading>
            <Box display='flex' alignItems="center" justifyContent='space-evenly'>
                <Box />
                <Box />
            </Box>
        </Box>
    )
}

export default Main;
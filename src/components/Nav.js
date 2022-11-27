import React from "react";
import { Box, Heading } from "@chakra-ui/react";

function Nav() {
    return (
        <Box display='flex' p='4' justifyContent="space-between" shadow="base" bg='gray.100'>
            <Heading size='xl' >Battleship</Heading>
        </Box>
    )
}

export default Nav;
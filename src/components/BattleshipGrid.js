import React from "react";
import { Box } from "@chakra-ui/react";
import uniqid from 'uniqid';

function CellHover({x, y, currShip = {length: 1}, rotation, gamePhase, isFilled}) {
    // console.log(x, y, shipList, rotation, gamePhase, isFilled);
    const ship = currShip;
    let shipWidth;
    let shipHeight;
    if (rotation === 'h') {
        shipWidth = Math.min(ship.length, (7 - x));
        shipHeight = 1;
    } else if (rotation === 'v') {
        shipWidth = 1;
        shipHeight = Math.min(ship.length, (7 - y));
    };

    if (gamePhase === 'placement') {

        if (isFilled) {
            return <Box />
        }

        return (
                <Box
                    h="100%"
                    w="100%"
                    position="relative"
                    pointerEvents="hover"
                    cursor='pointer'
                    data-x={x}
                    data-y={y}
                    _hover={
                        {
                            w:`calc(${shipWidth * 100}% + 2px * ${shipWidth - 1})`,
                            h:`calc(${shipHeight * 100}% + 2px * ${shipHeight - 1})`,
                            bg:"blue.100"
                        }
                    }

                     />
            )

    }
}

function renderCell(i, filledSpots, hitSpots, missedSpots, handleTileClick, currShip, rotation, gamePhase, player, ) {
    const x = i % 7;
    const y = Math.floor(i / 7);
    const isHit = hitSpots.some((spot) => spot[0] === x && spot[1] === y);
    const isMissed = missedSpots.some((spot) => spot[0] === x && spot[1] === y);
    const isFilled = filledSpots.some((spot) => spot[0] === x && spot[1] === y);

    if (isHit) {
        return <Box key={uniqid()} data-x={x} data-y={y} w='calc(100% / 7)' h='calc(100% / 7)' bg="red.300" borderWidth="1px" />;
    }
    if (isMissed) {
        return <Box key={uniqid()} data-x={x} data-y={y} w='calc(100% / 7)' h='calc(100% / 7)' bg="gray.600" borderWidth="1px"/>;
    } 
    if (isFilled) {
        if (player.getName() === 'Computer') {
            return <Box key={uniqid()} data-x={x} data-y={y} cursor='pointer' _hover={{bg:'gray.300'}} onClick={(e) => handleTileClick(e, player)} w='calc(100% / 7)' h='calc(100% / 7)' bg="white" borderWidth="1px"/>;
        } 
            return <Box key={uniqid()} data-x={x} data-y={y} w='calc(100% / 7)' h='calc(100% / 7)' bg="blue.300" borderWidth="1px">
            <CellHover x={x} y={y} currShip={currShip} rotation={rotation} gamePhase={gamePhase} isHit={isHit} isFilled={isFilled} />
            </Box>;
        
    }

    if (player.getName() === 'Computer' || gamePhase === 'placement') {
        return <Box key={uniqid()} data-x={x} data-y={y} cursor='pointer' _hover={{bg:'gray.300'}} onClick={(e) => handleTileClick(e, player)} w='calc(100% / 7)' h='calc(100% / 7)' bg="white" borderWidth="1px">
            <CellHover x={x} y={y} currShip={currShip} rotation={rotation} gamePhase={gamePhase} isHit={isHit} isFilled={isFilled} />
            </Box>;

    }

    return <Box key={uniqid()} data-x={x} data-y={y} w='calc(100% / 7)' h='calc(100% / 7)' bg="white" borderWidth="1px">
            <CellHover x={x} y={y} currShip={currShip} rotation={rotation} gamePhase={gamePhase} isHit={isHit} isFilled={isFilled} />
            </Box>;
    


}


function BattleshipGrid({playerTurn, handleTileClick, player, rotation, currShip, gamePhase,  ...other}) {
    // console.log(handleTileClick);

    const filledSpots = player.gameBoard.getFilledSpots() || [];
    const hitSpots = player.gameBoard.getHitSpots() || [];
    const missedSpots = player.gameBoard.getMissedSpots() || [];
    

    const cells = [];
    for (let i = 0; i < 49; i++) {
        cells.push(renderCell(i, filledSpots, hitSpots, missedSpots, handleTileClick, currShip, rotation, gamePhase, player, playerTurn));
    }

    const highlightBoard = (user) => {
        if (user === null) return '1px';
        if (playerTurn === user) {
            return '5px'
        } 
            return '1px'
        
    };

    const boardOpacity = (user) => {
        if (user === null) return '1';
        if (playerTurn === user) {
            return '0.5'
        }
            return '1'
    }

    return (
        <Box id={player.getName()} display='flex' flexDirection='row' flexWrap="wrap" opacity={boardOpacity(player.getName())} borderWidth="3px" borderColor="gray.900" shadow="base" {...other}>
            {cells}
        </Box>

    )
};

export default BattleshipGrid;
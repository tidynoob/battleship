import React from 'react'
import { Box, Button, Modal, ModalBody, Heading, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter} from '@chakra-ui/react'
import BattleshipGrid from './BattleshipGrid'



function PlacementModal({isOpen, onClose, player, playerTurn, toggleRotation, handleTileClick, rotation, gamePhase, currShip, resetGame}) {

  // console.log('gamePhase: ', gamePhase)

  const winner = playerTurn === player.getName() ? 'Computer Wins!' : 'You Win!';

  if (gamePhase === 'over') {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader textAlign="center">Game Over</ModalHeader>
            <ModalBody display="flex" flexDir='column' alignItems="center" gap="4">
              <Heading size="md">{winner}</Heading>
              <Button colorScheme="gray" onClick={resetGame}>Play Again</Button>
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    )
  }

  if (gamePhase !== 'placement') return null;

  if (currShip === undefined) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent />
        </ModalOverlay>
      </Modal>
    )
  };
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader textAlign="center">Place your {currShip.shipName === undefined ? '' : currShip.shipName}</ModalHeader>
          <ModalBody >
            <Box display="flex" flexDir='column' gap='4' alignItems="center">
              <Button colorScheme="gray" onClick={toggleRotation}>Rotate Axis</Button>
              <BattleshipGrid gamePhase={gamePhase} currShip={currShip} playerTurn={playerTurn} handleTileClick={handleTileClick} player={player} rotation={rotation} h='sm' w='sm'/>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </ModalOverlay>
    </Modal>
    
  )
}

export default PlacementModal
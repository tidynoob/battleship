import React from 'react'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter} from '@chakra-ui/react'
import BattleshipGrid from './BattleshipGrid'



function PlacementModal({isOpen, onClose, player, playerTurn, toggleRotation, handleTileClick, rotation, gamePhase, shipList}) {
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader textAlign="center">Place your ships</ModalHeader>
          <ModalBody >
            <Box display="flex" flexDir='column' gap='4' alignItems="center">
              <Button colorScheme="gray" onClick={toggleRotation}>Rotate Axis</Button>
              <BattleshipGrid gamePhase={gamePhase} shipList={shipList} playerTurn={playerTurn} handleTileClick={handleTileClick} player={player} rotation={rotation} h='sm' w='sm'/>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </ModalOverlay>
    </Modal>
    
  )
}

export default PlacementModal
import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Nav from './components/Nav';
import Main from './components/Main';


function App() {

  return (
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
      <Box display="grid" gridTemplateRows="auto 1fr">
        <Nav />
        <Main/>
      </Box>
      </DndProvider>
    </ChakraProvider>
  );
}

export default App;

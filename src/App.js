import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import Nav from './components/Nav';
import Main from './components/Main';


function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box display="grid" gridTemplateRows="auto 1fr" minH="100vh">
        <Nav />
        <Main/>
      </Box>
    </ChakraProvider>
  );
}

export default App;

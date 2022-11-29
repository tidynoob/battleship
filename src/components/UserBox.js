import React from "react";

import { Box, Input, Heading } from "@chakra-ui/react";

function UserBox(props) {

    const { playerName, gamePhase, setPlayerName, ...other } = props;

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  if (gamePhase === "pregame") {
    return (
      <Box {...other}>
        <Input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={handleNameChange}
        />
      </Box>
    );
  }
  return (
    <Box {...other}>
      <Heading size="md">{playerName}</Heading>
    </Box>
  );
}

export default UserBox;
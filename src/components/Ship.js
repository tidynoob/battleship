import React from "react";
import { useDrag } from "react-dnd";
import { Box } from "@chakra-ui/react";

function Ship({ length, dir }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ship",
        item: { length, dir },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    

    return (
        <Box
            ref={drag}
            // opacity={isDragging ? 0.5 : 1}
            display="flex"
            flexDirection={dir}
            w={dir === "h" ? `${length * 50}px` : "50px"}
            h={dir === "v" ? `${length * 50}px` : "50px"}
            borderWidth="1px"
            borderColor="gray.900"
            bg="gray.400"
        />
    );
}

export default Ship;
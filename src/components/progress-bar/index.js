import { Box, Button, Collapse, Progress } from "@chakra-ui/react";
import { useState } from "react";

const MARGIN = 12;
export default function ProgressBar({ ...props }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Collapse in={isCollapsed}>
        <Button
          position={"absolute"}
          right={MARGIN}
          bottom={MARGIN}
          onClick={() => setIsCollapsed(false)}
          shadow="lg"
        >
          Show Progress
        </Button>
      </Collapse>

      <Collapse in={!isCollapsed}>
        <Box
          pointerEvents={isCollapsed ? "none" : "auto"}
          position={"absolute"}
          right={MARGIN}
          bottom={MARGIN}
          minW={360}
          minH={180}
          bg="white"
          borderColor={"gray.100"}
          borderWidth={3}
          shadow="lg"
          borderRadius={10}
          p={4}
        >
          <Progress
            hasStripe
            value={60}
            colorScheme={"green"}
            size="lg"
            borderRadius={10}
            mb={4}
          />
          <Button onClick={() => setIsCollapsed(true)}>Collapse</Button>
          HEY
        </Box>
      </Collapse>
    </>
  );
}

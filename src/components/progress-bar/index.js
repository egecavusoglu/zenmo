import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Progress,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProgress } from "src/lib/requests/progress";
import { Vulnerabilities } from "@prisma/client";
import { useToken } from "src/lib/requests/profile";

const MARGIN = 12;
export default function ProgressBar({ ...props }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { progress } = useProgress();
  const profile = useToken();
  const user = profile?.user;

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
          // minH={180}
          bg="white"
          borderColor={"gray.100"}
          borderWidth={3}
          shadow="lg"
          borderRadius={10}
          p={4}
        >
          {user ? (
            <>
              {" "}
              <Progress
                hasStripe
                value={progress?.percentFinished}
                colorScheme={"green"}
                size="lg"
                borderRadius={10}
                mb={4}
              />
              <Text mb={2} fontWeight={"medium"}>
                Your Progress %{progress?.percentFinished.toFixed(1)}
              </Text>
              {progress?.tasks.map((t) => (
                <TaskItem task={t.vulnerability} />
              ))}
            </>
          ) : (
            <Text>Log in to see progress</Text>
          )}
          <Flex
            mt={8}
            flex={1}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <Button onClick={() => setIsCollapsed(true)}>Close</Button>
          </Flex>
        </Box>
      </Collapse>
    </>
  );
}

function TaskItem({ task }) {
  const map = {
    EXPOSE_KEY: "Exposed API Key",
    MALFORMED_REQUEST: "Malformed Request",
    XSS_ATTACK: "Malformed Request",
    UNPROTECTED_ROUTE: "Unprotected Route",
  };

  return (
    <Flex alignItems={"center"} mb={1}>
      <CheckCircleIcon color={"green"} mr={2} />
      <Text>{map[task]}</Text>
    </Flex>
  );
}

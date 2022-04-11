import { CheckCircleIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Progress,
  Flex,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProgress } from "src/lib/requests/progress";

import { useAuthStore } from "src/store";

const MARGIN = 12;

const TASKS = {
  EXPOSE_KEY: { label: "Exposed API Key", hint: "" },
  MALFORMED_REQUEST: {
    label: "Malformed Request",
    hint: "Inspect the network request sent when you send a transaction and see if you can",
  },
  XSS_ATTACK: { label: "Cross Site Scripting Attack (XSS)", hint: "" },
  UNPROTECTED_ROUTE: { label: "Unprotected Route", hint: " " },
};

export default function ProgressBar({ ...props }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { progress } = useProgress();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const completedTaskKeys = progress?.tasks.map((t) => t.vulnerability);
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
          minW={380}
          // minH={180}
          bg="white"
          borderColor={"gray.100"}
          borderWidth={3}
          shadow="lg"
          borderRadius={10}
          p={4}
        >
          {isLoggedIn ? (
            <>
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
              {Object.keys(TASKS).map((t) => {
                const task = TASKS[t];
                return (
                  <TaskItem
                    task={task}
                    completed={completedTaskKeys.includes(t)}
                  />
                );
              })}
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

function TaskItem({ task, completed = false }) {
  return (
    <Flex alignItems={"center"} mb={1}>
      <CheckCircleIcon color={completed ? "green" : "gray.200"} mr={2} />
      <Text mr={2}>{task.label}</Text>
      <Popover>
        <PopoverTrigger>
          <InfoOutlineIcon cursor={"pointer"} color={"gray.500"} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Hint</PopoverHeader>
          <PopoverBody>{task?.hint}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

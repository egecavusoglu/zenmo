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
  EXPOSE_KEY: {
    label: "Exposed API Key",
    hint: "When developing a website, we regularly need to access third party API's that require us to verify our identity. This is regularly done through 'API Keys' or tokens that are tied to us through hashing and are regularly rotated. It's important to keep these safe because they can relate directly to billing and personal data access. Using the inspector, see if you can find an exposed key through normal usage of this site.",
  },
  MALFORMED_REQUEST: {
    label: "Malformed Request",
    hint: "The internet is built on the idea of allowing users to retrieve and create information. In allowing users to create information, we as developers open ourselves up to data and inputs that we do not control. It is our responsibility to minimize our exposure and weaknesses to potentially nefarious users. A good starting point is limiting the information the user has the ability to modify/control. See if you can find an api end point on this website that affords the user more control over data than they should have. Once you've found it, go ahead and 'steal' some resources from another user... it's fake money anyway.",
  },
  XSS_ATTACK: {
    label: "Cross Site Scripting Attack (XSS)",
    hint: "Cross Site Scripting vulnerabilities are among the most serious on the web with outcomes resulting in stolen information or resources, hijacked sessions, user misdirection, ... the list goes on. These vulnerabilities occur when user controlled data is not properly sanitized and a nefarious user is able to execute code on another users browser through your site. The simplest form of this is to insert valid html into an unprotected user input box that modifies a field that is viewable by other users. See if you can come up with an html input on this site that would cause other users viewing your profile to receive up a popup alert warning them that they've been hacked.",
  },
  UNPROTECTED_ROUTE: {
    label: "Unprotected Route",
    hint: "Not all data is public data. See if you can gain access to someone else's personal information without using the standard UI of the site.",
  },
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
                    key={t}
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

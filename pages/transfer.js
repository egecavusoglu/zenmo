import Navbar from "src/components/navbar";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
export default function Home() {
  return (
    <Box>
      <Navbar />

      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={12}>
        <Stack>
          <Heading color={"blue.400"} fontSize={"4xl"}>
            Send funds
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Be careful!
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Recipient</FormLabel>
              <Input />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Amount</FormLabel>
              <Input />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>
              <Button
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

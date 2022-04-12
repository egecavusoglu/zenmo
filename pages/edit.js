import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
  Box,
} from "@chakra-ui/react";
import Navbar from "src/components/navbar";
import { useState } from "react";
import { postRequest } from "src/lib/fetch";

export default function UserProfileEdit() {
  const toast = useToast();
  const [username, setUsername] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postRequest({
      url: "/api/edit",
      body: {
        new_username: username,
      },
    });

    if (response?.isSuccess) {
      toast({
        title: "Changed!",
        description: "Your username was updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUsername("");
      return;
    }

    toast({
      title: "Oops.",
      description: "There has been an error changing your username",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <Box>
       <Navbar />
   
    <form onSubmit={handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>

          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="User name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              type="submit"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
    </Box>
  );
}

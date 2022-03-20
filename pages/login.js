import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  useToast,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@wustl.edu")) {
      toast({
        title: "Please use a valid WUSTL email to continue.",
        description: "We can't give credit for your personal email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    router.push("/transfer");
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={12} width={"xl"}>
          <Stack align={"center"}>
            <Heading color={"blue.400"} fontSize={"4xl"}>
              Zenmo
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Send money with ease!
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack>
              <FormControl isRequired id="email">
                <FormLabel>Email address</FormLabel>

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Text fontSize={"sm"} mt={4} px={1}>
                  This is how we determine if you completed the assignment,
                  please put your real email to receive credit.
                </Text>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Log In
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}

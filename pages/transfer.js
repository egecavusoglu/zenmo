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
  NumberInput,
  NumberInputField,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { postRequest } from "src/lib/fetch";
import { useToken } from "src/lib/requests/profile";

export default function Home() {
  const toast = useToast();
  const profile = useToken();
  const user = profile?.user;
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const handleTransferFunds = async (e) => {
    e.preventDefault();
    setLoading(true);
    const parsedAmount = parseFloat(amount);
    const response = await postRequest({
      url: "/api/transfer",
      body: {
        from: user?.username,
        to: username,
        amount: parsedAmount,
      },
    });
    setLoading(false);
    if (response?.isSuccess) {
      toast({
        title: "Sent!",
        description: "Your funds were transferred",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUsername("");
      return;
    }

    toast({
      title: "Oops.",
      description: "There has been an error completing transaction",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Navbar />

      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={12}>
        <Stack>
          <Heading color={"blue.400"} fontSize={"4xl"}>
            Send funds
          </Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            Be careful!
          </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleTransferFunds}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Recipient username</FormLabel>
                <Input
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Amount ($)</FormLabel>
                <NumberInput precision={2}>
                  <NumberInputField
                    placeholder="10.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </NumberInput>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  isLoading={loading}
                  type="submit"
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
          </form>
        </Box>
      </Stack>
    </Box>
  );
}

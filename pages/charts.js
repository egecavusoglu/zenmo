import Navbar from "src/components/navbar";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { getRequest, postRequest } from "src/lib/fetch";
import React, { useState, useEffect } from "react";

export default function Charts() {
  const [stockPrice, setStockPrice] = useState("Loading");
  const [key, setKey] = useState("");
  const getPrice = async (e) => {
    const response = await getRequest({
      url: "/api/price?key=c32db451-3f3d-4055-9d0e-c5c5c8ebf96a",
    });
    const price = response?.price;
    setStockPrice(price ? price : "Error");
  };
  useEffect(() => {
    getPrice();
  });

  const handleVerify = async (e) => {
    e.preventDefault();
    const response = await postRequest({
      url: "/api/verifyKey",
      body: {
        api_key: key,
      },
    });
  };

  // TODO: clean up UI and add some visual feedback that shows it worked
  return (
    <Box>
      <Navbar />
      <Center py={6}>
        <StatGroup>
          <Stat>
            <StatLabel>Zenmo Stock Price</StatLabel>
            <StatNumber>{stockPrice}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              33.00%
            </StatHelpText>
          </Stat>
        </StatGroup>

        <p>I heard that someone forgot to lock down the controls on the API key to fetch the stock data. Can you get it for me? It would sure save us a lot of money :)</p>

      
        <Box>
          <form onSubmit={handleVerify}>
            <FormControl id="api_key" isRequired>
              <FormLabel>API Key</FormLabel>
              <Input
                placeholder="api key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </FormControl>

            <Stack spacing={4}>
              <Stack spacing={10}>
                <Button
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
      </Center>
    </Box>
  );
}

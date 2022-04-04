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
} from "@chakra-ui/react";
import { getRequest } from "src/lib/fetch";
import React, { useState, useEffect } from "react";

export default function Charts() {
  const [stockPrice, setStockPrice] = useState("Loading");
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
      </Center>
    </Box>
  );
}

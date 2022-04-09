import { ChakraProvider } from "@chakra-ui/react";
import ProgressBar from "src/components/progress-bar";
import { Box } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box h={"100vh"} position="relative">
        <Component {...pageProps} />
        <ProgressBar />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;

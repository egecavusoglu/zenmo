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
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useProfile } from "src/lib/requests/profile";

export default function Profile({ ...props }) {
  const router = useRouter();
  const { userId } = router.query;
  const { user, loading, error } = useProfile(userId);

  return (
    <Box>
      <Navbar />
      <Center py={6}>
        <Box
          maxW={"270px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            h={"120px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              // src={}
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              <>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {user?.username}
                  </Heading>
                  <Text color={"gray.500"}>{user?.email}</Text>
                </Stack>
                <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>${user?.balance?.toFixed(2)}</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Balance
                    </Text>
                  </Stack>
                </Stack>{" "}
              </>
            )}
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

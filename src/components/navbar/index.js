import {
  Box,
  Flex,
  Text,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useToken } from "src/lib/requests/profile";
import { logout } from "src/lib/requests/auth";
import { useProgress } from "src/lib/requests/progress";

function Links() {
  const profile = useToken();
  const user = profile?.user;

  const Links = [
    {
      label: "Transfer",
      route: "/transfer",
    },
    {
      label: "Profile",
      route: `/profile/${user?.id}`,
    },
    {
      label: "Charts",
      route: "/charts",
    },
    // "Transactions"
  ];

  return Links.map((link) => <NavLink key={link.route} link={link} />);
}

const NavLink = ({ link }) => (
  <NextLink href={link.route}>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {link.label}
    </Link>
  </NextLink>
);

export default function Simple() {
  const router = useRouter();
  const { mutator } = useProgress();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    await logout();
    mutator();
    // router.push("/");
  };
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Text color="blue.500" fontWeight={"bold"} fontSize="xl">
              Zenmo
            </Text>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Links />
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              variant={"none"}
              cursor={"pointer"}
              minW={0}
              color={"gray.600"}
              onClick={handleLogout}
            >
              Log out
            </MenuButton>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Links />
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

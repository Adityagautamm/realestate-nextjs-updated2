import Link from "next/link";
import Image from "next/image";
import {
  MenuGroup,
  MenuDivider,
  MenuButton,
  IconButton,
  Flex,
  Box,
  Spacer,
  useDisclosure,
  MenuItem,
  Menu,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import bobthebuilder from "../assets/images/bobthebuilder.png";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100" height="10%">
      <Box fontSize="3xl" color="blue.400" fontWeight="bold">
        <Link href="/" paddingLeft="2">
          Bob's Portfolio
        </Link>
        {/*My menu code begins*/}

        <Menu isOpen={isOpen}>
          <MenuButton
            variant="ghost"
            mx={1}
            py={[1, 2, 2]}
            px={4}
            borderRadius={5}
            _hover={{ bg: useColorModeValue("gray.200", "green") }}
            aria-label="Courses"
            fontWeight="normal"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            fontSize={21}
          >
            Real Estate
          </MenuButton>
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            <MenuGroup
              title="Search By Purpose"
              fontSize={19}
              textColor="orange.300"
            >
              <Link href="/search?purpose=for-rent" passHref>
                <MenuItem textColor="gray.500" fontSize={20}>
                  Rent
                </MenuItem>
              </Link>
              <Link href="/search?purpose=for-sale" passHref>
                <MenuItem textColor="gray.500" fontSize={20}>
                  Buy
                </MenuItem>
              </Link>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup
              title="Search By Location"
              fontSize={19}
              textColor="orange.300"
            >
              <Link href="/search?locationExternalIDs=5002" passHref>
                <MenuItem textColor="gray.500" fontSize={20}>
                  Dubai
                </MenuItem>
              </Link>
              <Link href="/search?locationExternalIDs=6020" passHref>
                <MenuItem textColor="gray.500" fontSize={20}>
                  Abu Dhabi
                </MenuItem>
              </Link>
              <Link href="/search?locationExternalIDs=5351" passHref>
                <MenuItem textColor="gray.500" fontSize={20}>
                  Sharjah
                </MenuItem>
              </Link>
            </MenuGroup>
          </MenuList>
        </Menu>
        {/*My menu code ends*/}
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FcMenu />}
            variant="outline"
            color="red.400"
          />
          <MenuList>
            <Link href="/" passHref>
              <MenuItem icon={<FcHome />}>Home</MenuItem>
            </Link>
            <Link href="/search" passHref>
              <MenuItem icon={<BsSearch />}>Search</MenuItem>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
              <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
              <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;

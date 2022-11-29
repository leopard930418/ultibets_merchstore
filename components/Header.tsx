import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import "@fontsource/nunito";
import NavLink from "./Navlink";

const Header = () => {
  const LinkArry = [
    {
      name: "Home",
      // href: '/',
      href: "https://ultibets.vercel.app/",
    },
    {
      name: "Prediction Markets",
      href: "https://ultibetsmainapp.vercel.app/bets",
    },

    {
      name: "Squid Bet Competitions",
      href: "https://ultibetsmainapp.vercel.app/squid-competition",
    },
    {
      name: "UtBets Token",
      href: "https://ultibetsmainapp.vercel.app/utbets-token",
    },
    {
      name: "Governance",
      href: "https://ultibetsmainapp.vercel.app/governance",
    },
    {
      name: "Merch Store",
      href: "https://ultibetsmerchstore.vercel.app/merch-store",
    },
    {
      name: "FAQ",
      href: "https://ultibetsmainapp.vercel.app/faq",
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box
      // position="fixed"
      zIndex={10}
      h={["full", "unset", "80px", "80px"]}
      bg="#1F1F1F"
    >
      {" "}
      <Box
        display={["flex", "flex", "block", "block"]}
        bg="#1F1F1F"
        h={["full", "unset", "80px", "80px"]}
        width={"100%"}
        // position={'fixed'}
        justifyContent={[
          "space-between",
          "space-between",
          "center",
          "space-between",
        ]}
        alignItems={"center"}
      >
        <header>
          <Flex justifyContent={"space-between"}>
            <Flex
              justifyContent={"center"}
              alignItems="center"
              display={["none", "none", "none", "flex"]}
            >
              <NextLink href="/" passHref>
                <Link>
                  {" "}
                  <Image
                    src="/images/svgs/with-color-logo.svg"
                    alt="logo"
                    width={["130px", "unset", "130px", "170px"]}
                    marginLeft={"28px"}
                    marginTop={"15px"}
                    marginRight={"20px"}
                  />
                  <Box
                    opacity={0.8}
                    // zIndex={-1}
                    position={"absolute"}
                    width={"289px"}
                    height={"289px"}
                    marginLeft={["-70px"]}
                    marginTop={["-160px"]}
                    background={
                      "radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)"
                    }
                  />{" "}
                </Link>
              </NextLink>
            </Flex>
            <Flex
              width={["100vw", "100vw", "auto", "100%"]}
              justifyContent={"space-between"}
              display={["flex", "flex", "flex", "none"]}
            >
              <Image
                src="/images/svgs/bg/logo-vector.svg"
                alt="logo"
                ml={"4"}
                mt={"4"}
                width={["80%"]}
              />
              <Box
                opacity={0.8}
                // zIndex={-1}
                position={"absolute"}
                width={"289px"}
                height={"289px"}
                marginLeft={["-100px"]}
                marginTop={["-160px"]}
                background={
                  "radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)"
                }
              />{" "}
              <Flex
                mr={"10px"}
                alignItems="center"
                display={["flex", "flex", "none", "none"]}
              >
                {isOpen ? (
                  <CloseIcon
                    color={"white"}
                    fontSize="28px"
                    onClick={handleToggle}
                  />
                ) : (
                  <HamburgerIcon
                    color={"white"}
                    fontSize="30px"
                    onClick={handleToggle}
                  />
                )}
              </Flex>
            </Flex>
            {/* navbar */}
            <Flex>
              <Flex
                display={["none", "none", "flex", "flex"]}
                width={["unset", "unset", "100%", "100%"]}
                mt={["unset", "unset", 7, 7]}
                height={["unset", "unset", 15, 15]}
                gap={["unset", "unset", "10px", 4, 8]}
                ml={["unset", "unset", "10px"]}
                alignItems={["unset", "unset", "center", "center"]}
              >
                {LinkArry.map((item, index) => (
                  <NavLink key={index} name={item.name} href={item.href} />
                ))}
              </Flex>
            </Flex>

            {/* navbar */}
            {/* <Flex>
              <Flex
                mt={['unset', 'unset', '17px', '14px']}
                mr={'10px'}
                display={['none', 'none', 'flex', 'flex']}
                gap={'10px'}
              >
                <Account />
              </Flex>{' '}
            </Flex> */}
            {/* launch app button */}
            <Flex
              justifyContent={["center"]}
              width={["200px", "unset", "200px", "250px"]}
            >
              <Flex
                mt={"18px"}
                display={["none", "none", "flex", "flex"]}
                // mr={["unset", "unset", "unset", "40px"]}
              >
                <a href="https://ultibetsmainapp.vercel.app/bets">
                  <Button
                    height={"41px"}
                    width={["162px", "162px", "120px", "140px", "162px"]}
                    borderRadius={"34px"}
                    border={"1px solid #FC541C"}
                    background={"unset"}
                    _hover={{ background: "#FC541C" }}
                  >
                    <Text
                      fontFamily={"Nunito"}
                      fontSize={["14px", "14px", "14px", "18px"]}
                      fontWeight={"700"}
                      lineHeight={"25px"}
                      letterSpacing={"0em"}
                      textAlign={"left"}
                      color={"#FFFFFF"}
                    >
                      Launch App
                    </Text>
                  </Button>
                </a>
              </Flex>{" "}
            </Flex>
            {/* launch app button */}
          </Flex>
        </header>
      </Box>
      <Flex
        display={[isOpen ? "flex" : "none", "none", "none", "none"]}
        gap={"10px"}
        width={"100%"}
      >
        {" "}
        <Flex direction={"column"}>
          {LinkArry.map((item, index) => (
            <NavLink
              key={index}
              href={item.href}
              name={item.name}
              onClose={onClose}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

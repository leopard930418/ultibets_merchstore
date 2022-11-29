import { Box, Flex, Grid, Text, Button, Icon, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import Tees from "../../components/Tees";
import { TeesData } from "../../constant/";

import "@fontsource/inter";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { BsBag } from "react-icons/bs";

const MerchStore: NextPage = () => {
  const [wWidth, setWWidth] = useState(500);
  const getWWidth: any = () => {
    setWWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", getWWidth);
    return () => {
      window.removeEventListener("resize", getWWidth);
    };
  }, [wWidth]);
  useEffect(() => {
    setWWidth(window.innerWidth);
  }, []);
  const subCategories = [
    {
      name: "All Items",
      link: "/merch-store/all-items",
    },
    {
      name: "Men T-shirts",
      link: "/merch-store/men-tshirt",
    },
    {
      name: "Women T-shirts",
      link: "/merch-store/women-tshirt",
    },
    {
      name: "Hoodies",
      link: "/merch-store/hoodie",
    },
    {
      name: "Cap",
      link: "/merch-store/cap",
    },
    {
      name: "Mug",
      link: "/merch-store/mug",
    },
  ];
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const router = useRouter();
  const [category, setCategory] = useState("index");
  
  return (
    <>
      {/* // subheader start */}
      <Flex
        bgColor={"#1F1F1F"}
        justifyContent="center"
        alignItems={"center"}
        display={["none", "none", "flex", "flex"]}
        zIndex={11}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"600px"}
          mb={"20px"}
        >
          {subCategories.map((subCategory) => (
            <NextLink href={"/merch-store"} key={subCategory.name} passHref>
              <Link
                color={category == subCategory.name ? "#FF9100" : "white"}
                _focus={{
                  border: "none",
                  color: "#FF9100",
                }}
                _hover={{
                  color: "#FF9100",
                }}
                _selected={{
                  color: "#FF9100",
                }}
                fontSize={"16px"}
                fontWeight={"normal"}
                onClick={() => {
                  setCategory(subCategory.name);
                }}
              >
                {subCategory.name}
              </Link>
            </NextLink>
          ))}
          {cartQuantity && (
            <Flex
              cursor={"pointer"}
              width={["80px", "90px", "100px", "130px"]}
              height={["30px", "40px", "50px", "50px"]}
              gap={"10px"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              borderRadius={["10px", "15px", "15px", "20px"]}
              border="1px solid #FC541C"
              backgroundColor={"#1F1F1F"}
              color={"white"}
              _hover={{
                backgroundColor: "#FC541C",
              }}
              _selected={{
                backgroundColor: "#FC541C",
              }}
              onClick={() => router.push("/checkout")}
            >
              <Text mt={"5px"} fontSize={["14px", "14px", "18px", "18px"]}>
                {" "}
                Cart
              </Text>
              <Icon as={BsBag} fontSize={["18px", "18px", "18px", "30px"]} />
              <Text
                position={"absolute"}
                ml={"62px"}
                mt={"8px"}
                fontSize={["12px", "14px", "18px", "16px"]}
                fontWeight={"extrabold"}
                color={"white"}
              >
                {cartQuantity > 0 && cartQuantity}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      {/* // subheader end */}
      <Box>
        {/* <Box
        display={['none', 'none', 'none', 'block']}
        overflow={'hidden'}
        position={'absolute'}
        width={'672px'}
        height={'672px'}
        left='1009px'
        top={'-64px'}
        bgGradient={
          'radial-gradient(50% 50% at 50% 50%, rgba(115, 154, 240, 0.4) 0%, rgba(115, 154, 240, 0) 100%)'
        }
      ></Box> */}

        <Box
          bg={"#1F1F1F"}
          width={"auto"}
          minHeight={
            wWidth > 5100
              ? "2340px"
              : wWidth >= 4000
              ? "1710px"
              : wWidth >= 2700
              ? "1080px"
              : wWidth >= 1800
              ? "860px"
              : wWidth >= 1700
              ? "680px"
              : "610px"
          }
        >
          <Flex
            direction={"column"}
            gap={"10px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {category == "index" ? (
              <>
                {" "}
                <Text
                  color={"white"}
                  fontSize={["27px", "27px", "27px", "27px"]}
                  fontWeight={"700"}
                  lineHeight={"32.68px"}
                  fontFamily={"inter"}
                  mb={"10px"}
                  mt={"10px"}
                >
                  Featured Products 🔥
                </Text>{" "}
              </>
            ) : (
              <></>
            )}

            <Grid
              zIndex={11}
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
              ]}
              mr={"25px"}
              gap={wWidth < 3000 ? "50px" : "150px"}
              mb={"20px"}
            >
              {/* return obj.code == subCategories.filter((ele, index) => {return(ele.name === category)}).at(0).link.split("/")[2]; */}
              {category == "All Items" || category == "index"
                ? TeesData.map((tee) => {
                    return (
                      <Tees
                        key={tee.id}
                        id={tee.id}
                        name={tee.name}
                        price={tee.price}
                        image={tee.image}
                      />
                    );
                  })
                : TeesData.filter((obj) => {
                    return (
                      obj.code ==
                      subCategories
                        .filter((element) => {
                          return(element.name == category)
                        })
                        .at(0)
                        ?.link.split("/")[2]
                    );
                  }).map((tee) => {
                    return (
                      <Tees
                        key={tee.id}
                        id={tee.id}
                        name={tee.name}
                        price={tee.price}
                        image={tee.image}
                      />
                    );
                  })}
            </Grid>
          </Flex>
        </Box>
        {/* <Box
        zIndex={1}
        position={'absolute'}
        width={'600px'}
        height={'600px'}
        left='-336px'
        top={'464px'}
        bgGradient={
          'radial-gradient(50% 50% at 50% 50%, rgba(115, 154, 240, 0.4) 0%, rgba(115, 154, 240, 0) 100%)'
        }
      ></Box> */}
      </Box>
    </>
  );
};

export default MerchStore;

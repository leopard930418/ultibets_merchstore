import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Tees from "../../components/Tees";
import { TeesData } from "../../constant/";
import "@fontsource/inter";
import { useState, useEffect } from "react"

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
  return (
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

      <Box bg={"#1F1F1F"} width={"auto"}  minHeight={
            wWidth > 5100
              ? '2340px'
              : wWidth > 4000
              ? '1710px'
              : wWidth > 2700
              ? '820px'
              : wWidth > 1800
              ? '730px'
              : wWidth > 1700
              ? '790px'
              : '700px'
          }> 
        <Flex
          direction={"column"}
          gap={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
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
          <Grid
            zIndex={11}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(3, 1fr)",
              "repeat(3, 1fr)",
            ]}
            mr={"25px"}
            gap={wWidth<3000?"50px":"150px"}
            mb={"20px"}
          >
            {TeesData.map((tee) => {
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
  );
};

export default MerchStore;

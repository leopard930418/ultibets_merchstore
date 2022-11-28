import { Link, Text, Tooltip } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

type NavlinkProps = {
  href: string;
  name: string;
  onClose?: () => void;
  footer?: boolean;
};

export default function NavLink({ name, href, onClose, footer }: NavlinkProps) {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div >
      {" "}
      {/* <NextLink href={href} passHref>
        <Text
          boxSizing="border-box"
          _focus={{
            border: 'none',
          }}
          _hover={{
            color: 'red',
            cursor: 'pointer',
          }}
          onClick={onClose}
          color={currentRoute === href ? '#E18833' : 'white'}
          fontSize={['16px', '16px', '14px', '18px']}
          padding={'5px'}
          pl={'20px'}
          fontFamily={'Nunito'}
          fontWeight={'bold'}
        >
          {name}
        </Text>
      </NextLink> */}
      <NextLink href={href} passHref >
        {/* <Tooltip
          display={name === 'Home' ? 'none' : 'flex'}
          label={'Coming Soon'}
          hasArrow
          bg={'#FF9100'}
          placement={'bottom'}
          borderRadius={'5px'}
        > */}
        <Link
          color={currentRoute === href ? "#FF9100" : "white"}
          _focus={{
            border: "none",
            color: "#FF9100",
          }}
          _hover={{
            color: "#FF9100",
          }}
          onClick={onClose}
          fontSize={["14px", "14px", "13px", footer ? "14px" : "14px", "16px"]}
          fontFamily={"Nunito"}
          fontWeight={"bold"}
          
        >
          {name}
        </Link>
        {/* </Tooltip> */}
      </NextLink>
    </div>
  );
}

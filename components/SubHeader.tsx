import { Box, Button, Flex, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BsBag } from 'react-icons/bs';
import { useRouter } from 'next/router';
const SubHeader = () => {
  const router = useRouter();
  // 'All Items',
  // 'Men T-Shirts',
  // 'Women T-Shirts',
  // 'Hoodies',
  // 'Cap',
  // 'Mug',

  const subCategories = [
    {
      name: 'All Items',
      link: '/merch-store/all-items',
    },
    {
      name: 'Men T-shirts',
      link: '/merch-store/men-tshirt',
    },
    {
      name: 'Women T-shirts',
      link: '/merch-store/women-tshirt',
    },
    {
      name: 'Hoodies',
      link: '/merch-store/hoodie',
    },
    {
      name: 'Cap',
      link: '/merch-store/cap',
    },
    {
      name: 'Mug',
      link: '/merch-store/mug',
    },
  ];
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  return (
    <Flex
      bgColor={'#1F1F1F'}
      justifyContent='center'
      alignItems={'center'}
      display={['none', 'none', 'flex', 'flex']}
      zIndex={11}
    >
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'600px'}
        mb={'20px'}
      >
        {subCategories.map((subCategory) => (
          <NextLink href={subCategory.link} key={subCategory.name} passHref>
            <Link
              color={'white'}
              _focus={{
                border: 'none',
                color: 'red',
              }}
              _hover={{
                color: 'red',
              }}
              _selected={{
                color: 'red',
              }}
              fontSize={'12px'}
              fontWeight={'normal'}
            >
              {subCategory.name}
            </Link>
          </NextLink>
        ))}
        {cartQuantity && (
          <Flex
            cursor={'pointer'}
            width={['80px', '90px', '100px', '130px']}
            height={['30px', '40px', '50px', '50px']}
            gap={'10px'}
            justifyContent={'space-evenly'}
            alignItems={'center'}
            borderRadius={['10px', '15px', '15px', '20px']}
            border='1px solid #FC541C'
            backgroundColor={'#1F1F1F'}
            color={'white'}
            _hover={{
              backgroundColor: '#FC541C',
            }}
            _selected={{
              backgroundColor: '#FC541C',
            }}
            onClick={() => router.push('/checkout')}
          >
            <Text mt={'5px'} fontSize={['14px', '14px', '18px', '18px']}>
              {' '}
              Cart
            </Text>
            <Icon as={BsBag} fontSize={['18px', '18px', '18px', '30px']} />
            <Text
              position={'absolute'}
              ml={'62px'}
              mt={'8px'}
              fontSize={['12px', '14px', '18px', '16px']}
              fontWeight={'extrabold'}
              color={'white'}
            >
              {cartQuantity > 0 && cartQuantity}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SubHeader;

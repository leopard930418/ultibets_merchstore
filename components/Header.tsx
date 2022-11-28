import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Account from './Account';
import { BsBag } from 'react-icons/bs';

import '@fontsource/nunito';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/router';

const Header = () => {
  const LinkArry = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Bets',
      href: '/bets',
    },

    {
      name: 'Squid Competition',
      href: '/squid-competition',
    },
    {
      name: 'UtBets Token',
      href: '/utbets-token',
    },
    {
      name: 'Governance',
      href: '/governance',
    },
    {
      name: 'Merch Store',
      href: '/merch-store',
      subMenu: [
        {
          name: '-All items',
          href: '/merch-store/all-items',
        },
        {
          name: '-Sale items',
          href: '/merch-store/sale-items',
        },
      ],
    },
    {
      name: 'FAQ',
      href: '/faq',
    },
  ];

  const cartQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box h={['full', 'unset', 'unset', '100px']} bg='#1F1F1F'>
      {' '}
      <Box
        display={['flex', 'flex', 'block', 'block']}
        bg='#1F1F1F'
        h={['full', 'unset', 'unset', '100px']}
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <header>
          <Flex justifyContent={'space-between'}>
            <Flex
              justifyContent={'center'}
              alignItems='center'
              display={['none', 'none', 'flex', 'flex']}
            >
              <NextLink href='/' passHref>
                <Link>
                  {' '}
                  <Image
                    src='/images/svgs/with-color-logo.svg'
                    alt='logo'
                    width={['200px', 'unset', 'unset', '100%']}
                  />
                </Link>
              </NextLink>
            </Flex>
            <Flex
              justifyContent={'center'}
              alignItems='center'
              display={['block', 'none', 'none', 'none']}
            >
              <NextLink href='/' passHref>
                <Link>
                  <Image
                    src='/images/svgs/logo-mobile-three.png'
                    alt='logo'
                    width={['80px', '80px', 'unset', '100%']}
                  />
                </Link>
              </NextLink>
            </Flex>

            <Flex
              alignItems='center'
              display={['flex', 'flex', 'flex', 'none']}
              onClick={handleToggle}
            >
              {isOpen ? (
                <CloseIcon
                  marginLeft={'260px'}
                  color={'white'}
                  fontSize='28px'
                  onClick={handleToggle}
                />
              ) : (
                <HamburgerIcon
                  marginLeft={'260px'}
                  color={'white'}
                  fontSize='30px'
                  onClick={handleToggle}
                />
              )}
            </Flex>

            <Flex
              display={['none', 'none', 'none', 'flex']}
              width={['unset', 'unset', 'unset', '100%']}
              mt={['unset', 'unset', 'unset', 7]}
              height={['unset', 'unset', 'unset', 15]}
              gap={['unset', 'unset', 'unset', 10]}
              ml={['unset', 'unset', 'unset', '90px']}
              alignItems={['unset', 'unset', 'unset', 'center']}
            >
              {LinkArry.map((item, index) => (
                <NextLink href={item.href} passHref key={index}>
                  <Link
                    color={'white'}
                    _focus={{
                      border: 'none',
                      color: 'red',
                    }}
                    _hover={{
                      color: 'red',
                    }}
                    fontSize={'18px'}
                    fontFamily={'Nunito'}
                    fontWeight={'bold'}
                  >
                    {item.name}
                  </Link>
                </NextLink>
              ))}
            </Flex>
            <Flex>
              <Flex
                mt={'14px'}
                mr={'10px'}
                display={['none', 'none', 'none', 'flex']}
                gap={'10px'}
              >
                <Account />
              </Flex>{' '}
            </Flex>
          </Flex>
        </header>
      </Box>
      <Box>
        {' '}
        <Flex
          justifyContent={[
            'space-between',
            'space-between',
            'space-between',
            'none',
          ]}
          gap={['10px', '10px', '10px', '10px']}
          direction={['column', 'column', 'column', 'column']}
          display={[
            isOpen ? 'flex' : 'none',
            isOpen ? 'flex' : 'none',
            isOpen ? 'flex' : 'none',
            'none',
          ]}
          p={['10px', '10px', '10px', '10px']}
          width={{ base: 'full', md: 'auto' }}
          alignItems='start'
          flexGrow={1}
        >
          {LinkArry.slice(0, 6).map((item, index) => (
            <div key={index}>
              <NextLink href={item.href} passHref>
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
                  onClick={handleToggle}
                  fontSize={'18px'}
                  fontWeight={'bold'}
                  fontFamily={'Nunito'}
                >
                  {item.name}
                </Link>
              </NextLink>
              <Flex ml={'25px'} direction='column' gap={'10px'}></Flex>
            </div>
          ))}
          <Flex ml={'25px'} direction='column' gap={'10px'}>
            <NextLink href='/merch-store/all-items' passHref>
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
                onClick={handleToggle}
              >
                - All Items
              </Link>
            </NextLink>

            <NextLink href='/merch-store/men-tshirt' passHref>
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
                onClick={handleToggle}
              >
                - Men T-Shirts
              </Link>
            </NextLink>
            <NextLink href='/merch-store/women-tshirt' passHref>
              <Link
                color={'white'}
                _focus={{
                  border: 'none',
                  color: 'red',
                }}
                _hover={{
                  color: 'red',
                }}
                fontSize={'12px'}
                fontWeight={'normal'}
                onClick={handleToggle}
              >
                - Women T-Shirts{' '}
              </Link>
            </NextLink>

            <NextLink href='/merch-store/hoodie' passHref>
              <Link
                color={'white'}
                _focus={{
                  border: 'none',
                  color: 'red',
                }}
                _hover={{
                  color: 'red',
                }}
                fontSize={'12px'}
                fontWeight={'normal'}
                onClick={handleToggle}
              >
                - Hoodies
              </Link>
            </NextLink>
            <NextLink href='/merch-store/cap' passHref>
              <Link
                color={'white'}
                _focus={{
                  border: 'none',
                  color: 'red',
                }}
                _hover={{
                  color: 'red',
                }}
                fontSize={'12px'}
                fontWeight={'normal'}
                onClick={handleToggle}
              >
                - Caps{' '}
              </Link>
            </NextLink>
            <NextLink href='/merch-store/mug' passHref>
              <Link
                color={'white'}
                _focus={{
                  border: 'none',
                  color: 'red',
                }}
                _hover={{
                  color: 'red',
                }}
                fontSize={'12px'}
                onClick={handleToggle}
                fontWeight={'normal'}
              >
                - Mug{' '}
              </Link>
            </NextLink>
          </Flex>
          <NextLink href='/' passHref>
            <Link
              color={'white'}
              _focus={{
                border: 'none',
                color: 'red',
              }}
              _hover={{
                color: 'red',
              }}
              fontSize={'md'}
              fontWeight={'bold'}
              onClick={handleToggle}
            >
              FAQ
            </Link>
          </NextLink>
          {cartQuantity && (
            <Flex
              cursor={'pointer'}
              width={['100px', '90px', '100px', '130px']}
              height={['40px', '40px', '50px', '50px']}
              gap={'10px'}
              justifyContent={'space-evenly'}
              alignItems={'center'}
              borderRadius={['15px', '15px', '15px', '20px']}
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
              <Text mt={'5px'} fontSize={['16px', '14px', '18px', '18px']}>
                {' '}
                Cart
              </Text>
              <Icon as={BsBag} fontSize={['26px', '18px', '18px', '30px']} />
              <Text
                position={'absolute'}
                ml={['50px', '10px', '10px', '62px']}
                mt={['6px', '0px', '0px', '8px']}
                fontSize={['15px', '14px', '18px', '16px']}
                fontWeight={'extrabold'}
                color={'white'}
              >
                {cartQuantity}
              </Text>
            </Flex>
          )}
          <Account />
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;

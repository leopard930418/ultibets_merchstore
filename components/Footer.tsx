import { Box, Button, Container, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
const Footer = () => {
  return (
    <Box
      bgGradient={'linear(to-r, #353535 29.48%, #5A3B2E 75.94%)'}
      borderStyle={'solid'}
      width={'100%'}
      bottom={0}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={2}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ md: 'space-between' }}
        align={{ md: 'center' }}
      >
        <Text color={'white'}>© 2022 Ultibets. All rights reserved</Text>
        <Stack direction={'row'} gap={'20px'}>
          <a href='https://medium.com/@ultibets' target='_new'>
            <Image
              src={'/images/svgs/medium-logo.svg'}
              alt='Twitter'
              height={50}
              width={50}
            />
          </a>
          <a href='http://t.me/ultibets' target='_new'>
            <Image
              src={'/images/svgs/telegram-logo.svg'}
              alt='Twitter'
              height={50}
              width={50}
            />
          </a>
          <a href='http://discord.gg/EsWqNmTcdr' target='_new'>
            <Image
              src={'/images/svgs/discord-logo.svg'}
              alt='Twitter'
              height={50}
              width={50}
            />
          </a>
          <a href='https://twitter.com/ultibets' target='_new'>
            <Image
              src={'/images/svgs/twitter-logo.svg'}
              alt='Twitter'
              height={50}
              width={50}
            />
          </a>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

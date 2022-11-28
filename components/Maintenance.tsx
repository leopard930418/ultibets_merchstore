import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { MdWarning } from 'react-icons/md';

const Maintenance = () => {
  const router = useRouter();
  return (
    <Flex
      height={'100vh'}
      width={'100vw'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        justifyContent={'center'}
        gap={'20px'}
        direction={'column'}
        alignItems={'center'}
      >
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Icon as={MdWarning} fontSize={'50px'} color='red.700' />

          <Text color={'white'} fontSize={'20px'} p={'10px'}>
            {' '}
            Page under construction
          </Text>
        </Flex>
        <Button
          onClick={() => {
            router.push('/merch-store');
          }}
          mt={4}
          backgroundColor={'#1F1F1F'}
          border='1px solid #FC541C'
          _hover={{
            backgroundColor: '#FC541C',
          }}
          _selected={{
            backgroundColor: '#FC541C',
          }}
          fontSize={'20px'}
        >
          <Text color={'white'} fontFamily={'Nunito'}>
            Explore Store
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Maintenance;

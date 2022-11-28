import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type TeesProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const Tees = ({ id, name, price, image }: TeesProps) => {
  const router = useRouter();
  return (
    <Box>
      <Box w={'100%'} margin={['10px', '10px', 'unset', 'unset']} zIndex={11}>
        <Box
          overflow={'visible'}
          position={'absolute'}
          ml={'-15px'}
          bgGradient={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.4) 0%, rgba(225, 136, 51, 0.4) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
        ></Box>

        <Box
          border={'1px solid #FFFFFF'}
          boxShadow={'inner'}
          borderRadius={'5px'}
          // margin='10px'
        >
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={{
              boxShadow: '0px 0px 10px #FFFFFF',
            }}
            onClick={() => {
              router.push(`/product/${id}`);
            }}
          >
            <Image
              src={image}
              width={['full', '300px', '300px', '300px']}
              height={['auto', '300px', '300px', '249px']}
              alt='Ultibets Tshirt'
            />
          </Flex>
        </Box>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={'10px'}
          pl={'10px'}
          pr={'10px'}
        >
          <Flex flexDirection={'column'}>
            <Text
              color={'white'}
              letterSpacing='3px'
              fontSize={'10px'}
              fontWeight={'900'}
            >
              {name?.toUpperCase()}
            </Text>
            <Text
              fontWeight={'900'}
              color={'#FFB11C'}
              letterSpacing='1px'
              fontSize={'12px'}
            >
              {' '}
              {price} USDC
            </Text>
          </Flex>
          <Button
            onClick={() => {
              router.push(`/product/${id}`);
            }}
            width={'70px'}
            height={'30px'}
            border={'1px solid #FC541C'}
            borderRadius={'3xl'}
            color={'white'}
            backgroundColor={'#1F1F1F'}
            _hover={{
              backgroundColor: '#FC541C',
            }}
            _selected={{
              backgroundColor: '#FC541C',
            }}
          >
            <Text fontSize={'12px'} fontWeight={'800px'}>
              Buy
            </Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Tees;

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoMdDoneAll } from 'react-icons/io';
import { toast } from 'react-toastify';
import '@fontsource/nunito';
import { TeesData } from '../constant';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../store/cart-slice';
import { RootState } from '../store';

type DetailedTeeProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  description?: string;
  weight?: number;
};
const DetailedTee = ({
  image,
  name,
  price,
  description,
  id,
  weight,
}: DetailedTeeProps) => {
  const [counter, setCounter] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isActiveS, setIsActiveS] = useState(false);
  const [isActiveM, setIsActiveM] = useState(false);
  const [isActiveL, setIsActiveL] = useState(false);
  const [isActiveXL, setIsActiveXL] = useState(false);
  const [size, setSize] = useState<null | string>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);

  const DetailedItem = TeesData.find((obj) => {
    return obj.id == router.query.slug;
  });

  const handleClick = (size: string) => {
    if (size === 'S') {
      setIsActiveS(true);
      setIsActiveM(false);
      setIsActiveL(false);
      setIsActiveXL(false);
      setSize('S');
    }
    if (size === 'M') {
      setSize('M');
      setIsActiveM(true);
      setIsActiveS(false);
      setIsActiveL(false);
      setIsActiveXL(false);
    }
    if (size === 'L') {
      setSize('L');
      setIsActiveL(true);
      setIsActiveM(false);
      setIsActiveS(false);
      setIsActiveXL(false);
    }
    if (size === 'XL') {
      setSize('XL');
      setIsActiveXL(true);
      setIsActiveM(false);
      setIsActiveL(false);
      setIsActiveS(false);
    }
  };
  const addItemHandler = () => {
    incrementCounter();
    dispatch(
      addItemToCart({
        id,
        price,
        name: description,
        size: size || 'Unique Size',
        image,
        weight,
      })
    );
  };

  const removeItemHandler = () => {
    const newSize = size ? size : 'Unique Size';
    dispatch(removeItemFromCart({ id, size: newSize }));
    decrementCounter();
  };

  return (
    <Box>
      <Box width={'auto'}>
        <Flex
          justifyContent={'center'}
          direction={['column', 'column', 'row', 'row']}
          alignItems='center'
        >
          <Flex
            direction={'column'}
            mt={['0', '0', '0', 'none']}
            ml={['0', '0', '0', 'none']}
          >
            <Flex
              border={'1px solid white'}
              borderRadius={'10px'}
              justifyContent='center'
              alignItems={'center'}
              mt={'10px'}
              mb={'auto'}
              _hover={{
                boxShadow: '0px 0px 10px #FC541C',
              }}
            >
              {' '}
              <Image
                src={image}
                width={['300px', '300px', '350px', '560px']}
                height={['250px', '250px', '240px', '465px']}
                alt={name}
                borderRadius={'10px'}
              />
            </Flex>
            <Text
              color={'white'}
              letterSpacing='3px'
              fontSize={'15px'}
              fontWeight={'900'}
              mt={'10px'}
              ml={'10px'}
              fontFamily={'Nunito'}
            >
              {name?.toUpperCase()}
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            ml={['0', '0', '50px', '50px']}
            mt={'20px'}
            w='auto'
          >
            <Flex gap={'3px'} direction={'column'}>
              <Text
                color={'white'}
                fontSize={'3xl'}
                fontWeight={'700'}
                fontFamily={'Nunito'}
                mt={'-20px'}
                ml={'20px'}
              >
                {description}
              </Text>
              <Text
                fontFamily={'Nunito'}
                color={'white'}
                fontSize={'16px'}
                fontWeight={'light'}
                ml={'20px'}
              >
                {price} USDC
              </Text>
            </Flex>
            <Flex gap={'8px'} mt={'20px'} direction={'column'}>
              <Text
                color={'white'}
                fontSize={'20px'}
                fontFamily={'Nunito'}
                fontWeight={'bold'}
                ml={'20px'}
              >
                Description
              </Text>

              <Flex gap={'5px'} direction={'column'}>
                <Text
                  fontFamily={'Nunito'}
                  color={'white'}
                  fontSize={'15px'}
                  fontWeight={'light'}
                  ml={'20px'}
                >
                  Material : {DetailedItem?.material}
                </Text>
                {DetailedItem?.fitting_style && (
                  <Text
                    fontFamily={'Nunito'}
                    color={'white'}
                    fontSize={'15px'}
                    fontWeight={'light'}
                    ml={'20px'}
                  >
                    Fitting Style : {DetailedItem?.fitting_style}
                  </Text>
                )}
                <Text
                  fontFamily={'Nunito'}
                  color={'white'}
                  fontSize={'15px'}
                  fontWeight={'light'}
                  ml={'20px'}
                >
                  Washing Temperature : {DetailedItem?.washing_temperature}
                </Text>
                {DetailedItem?.weight && (
                  <Text
                    color={'white'}
                    fontSize={'15px'}
                    fontFamily={'Nunito'}
                    fontWeight={'light'}
                    ml={'20px'}
                  >
                    Weight : {DetailedItem?.weight} gm
                  </Text>
                )}
                {DetailedItem?.printing && (
                  <Text
                    fontFamily={'Nunito'}
                    color={'white'}
                    fontSize={'15px'}
                    fontWeight={'light'}
                    ml={'20px'}
                  >
                    Printing : {DetailedItem?.printing}
                  </Text>
                )}

                {DetailedItem?.size && (
                  <Text
                    fontFamily={'Nunito'}
                    color={'white'}
                    fontSize={'15px'}
                    fontWeight={'light'}
                    ml={'20px'}
                  >
                    Size : {DetailedItem?.size}
                  </Text>
                )}
                {DetailedItem?.printing_dimension && (
                  <Text
                    fontFamily={'Nunito'}
                    color={'white'}
                    fontSize={'15px'}
                    fontWeight={'light'}
                    ml={'20px'}
                  >
                    Printing Dimension : {DetailedItem?.printing_dimension}
                  </Text>
                )}
                {DetailedItem?.capacity && (
                  <Text
                    fontFamily={'Nunito'}
                    color={'white'}
                    fontSize={'15px'}
                    fontWeight={'light'}
                    ml={'20px'}
                  >
                    Capacity : {DetailedItem?.capacity}
                  </Text>
                )}
              </Flex>
            </Flex>
            <Box mt={'10px'}>
              <Text
                mt={'5px'}
                color={'GrayText'}
                fontSize={'16px'}
                fontWeight={'light'}
                ml={'20px'}
              >
                Size
              </Text>
              {DetailedItem?.code === 'cap' ||
              DetailedItem?.code === 'mug' ? null : (
                <Grid
                  ml={'20px'}
                  templateColumns={'repeat(5, 1fr)'}
                  gap='1px'
                  width={'300px'}
                >
                  {DetailedItem?.code !== 'hoodie' ? (
                    <Flex
                      style={{
                        backgroundColor: isActiveS ? '#FC541C' : '',
                      }}
                      w={'40px'}
                      h={'30px'}
                      borderRadius={'2px'}
                      border={'1px solid white'}
                      justifyContent='center'
                      alignItems={'center'}
                      mt={'10px'}
                      cursor={'pointer'}
                      _hover={{
                        backgroundColor: '#FC541C',
                        shadow: '0px 0px 5px #FC541C',
                      }}
                      onClick={() => handleClick('S')}
                    >
                      <Text
                        fontSize={'12px'}
                        color={'white'}
                        fontWeight='extrabold'
                      >
                        S
                      </Text>
                    </Flex>
                  ) : null}
                  <Flex
                    style={{
                      backgroundColor: isActiveM ? '#FC541C' : '',
                    }}
                    w={'40px'}
                    h={'30px'}
                    borderRadius={'2px'}
                    border={'1px solid white'}
                    justifyContent='center'
                    alignItems={'center'}
                    mt={'10px'}
                    cursor={'pointer'}
                    _hover={{
                      backgroundColor: '#FC541C',
                      shadow: '0px 0px 5px #FC541C',
                    }}
                    onClick={() => handleClick('M')}
                  >
                    <Text
                      fontSize={'12px'}
                      color={'white'}
                      fontWeight='extrabold'
                    >
                      M
                    </Text>
                  </Flex>
                  <Flex
                    style={{
                      backgroundColor: isActiveL ? '#FC541C' : '',
                    }}
                    w={'40px'}
                    h={'30px'}
                    borderRadius={'2px'}
                    border={'1px solid white'}
                    justifyContent='center'
                    alignItems={'center'}
                    mt={'10px'}
                    cursor={'pointer'}
                    _hover={{
                      backgroundColor: '#FC541C',
                      shadow: '0px 0px 5px #FC541C',
                    }}
                    onClick={() => handleClick('L')}
                  >
                    <Text
                      fontSize={'12px'}
                      color={'white'}
                      fontWeight='extrabold'
                    >
                      L
                    </Text>
                  </Flex>
                  <Flex
                    style={{
                      backgroundColor: isActiveXL ? '#FC541C' : '',
                    }}
                    w={'40px'}
                    h={'30px'}
                    borderRadius={'2px'}
                    border={'1px solid white'}
                    justifyContent='center'
                    alignItems={'center'}
                    mt={'10px'}
                    cursor={'pointer'}
                    _hover={{
                      backgroundColor: '#FC541C',
                      shadow: '0px 0px 5px #FC541C',
                    }}
                    onClick={() => handleClick('XL')}
                  >
                    <Text
                      fontSize={'12px'}
                      color={'white'}
                      fontWeight='extrabold'
                    >
                      XL
                    </Text>
                  </Flex>
                </Grid>
              )}
              {DetailedItem?.code === 'cap' && (
                <Flex m={'20px'}>
                  <Text color={'white'}>
                    {' '}
                    Unique size (Adjustable on the back)
                  </Text>
                </Flex>
              )}
              {DetailedItem?.code === 'mug' && (
                <Flex m={'20px'}>
                  <Text color={'white'}> Unique size</Text>
                </Flex>
              )}

              {!size &&
                DetailedItem?.code !== 'cap' &&
                DetailedItem?.code !== 'mug' && (
                  <Text color={'red'} fontSize={'12px'} ml={'20px'} mt={'10px'}>
                    Please select a size
                  </Text>
                )}
            </Box>
            <Flex
              ml={'20px'}
              mt={'30px'}
              mb={'20px'}
              direction={['column', 'column', 'row', 'row']}
              gap={'20px'}
            >
              <Flex>
                {' '}
                <IconButton
                  disabled={counter === 0}
                  mt={'2px'}
                  aria-label='Search database'
                  onClick={removeItemHandler}
                  icon={<MinusIcon />}
                />{' '}
                <Flex alignItems={'center'}>
                  <Text color={'white'} m={'10px'}>
                    {counter}
                  </Text>
                  <IconButton
                    disabled={
                      !size &&
                      !(
                        DetailedItem?.code === 'cap' ||
                        DetailedItem?.code === 'mug'
                      )
                    }
                    aria-label='Search database'
                    onClick={addItemHandler}
                    icon={<AddIcon />}
                  />
                </Flex>
              </Flex>

              <Button
                disabled={
                  (!size &&
                    !(
                      DetailedItem?.code === 'cap' ||
                      DetailedItem?.code === 'mug'
                    )) ||
                  counter === 0
                }
                onClick={async () => {
                  onOpen();
                  toast.success(`item Added to cart`, {
                    position: 'top-right',
                    autoClose: 2000,
                    theme: 'dark',
                  });
                }}
                width={['300px', 'auto', '300px', '330px']}
                border='1px solid #FC541C'
                backgroundColor={'#1F1F1F'}
                color={'white'}
                p={'10px'}
                _hover={{
                  backgroundColor: '#FC541C',
                }}
              >
                <Text fontSize={'20px'}> Add to Cart</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Modal
          variant={'wide'}
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent width={['300px', '300px', 'unset', 'unset']}>
            <ModalHeader>
              <Text color={'#FC541C'}>Check out</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                justifyContent={'center'}
                gap={'10px'}
                alignItems={'center'}
                mb={'10px'}
              >
                <Text
                  as={'span'}
                  fontWeight='normal'
                  fontSize={['18px', '18px', '18px', '20px']}
                >
                  <strong>item added to your cart</strong>
                </Text>
                <Icon
                  fontSize={['16px', '16px', '16px', '20px']}
                  as={IoMdDoneAll}
                />
              </Flex>
              <Flex justifyContent={'space-between'}>
                <Flex flexDirection={'column'} justifyContent='center'>
                  <Text fontSize={['14px', '18px', '18px', '16px']}>
                    {description}
                  </Text>
                  <Text fontSize={['12px', '12px', '12px', '13px']}>
                    {`Size: ${size || 'Unique size'}`}
                  </Text>
                  <Text fontSize={['12px', '12px', '12px', '13px']}>
                    {`Price: ${price} USDC`}
                  </Text>
                </Flex>
                <Flex>
                  <Image
                    src={image}
                    width={130}
                    height={100}
                    alt={description}
                  />
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                width={['150px', '100px', 'unset', 'unset']}
                backgroundColor={'#1F1F1F'}
                border='1px solid #FC541C'
                _hover={{
                  backgroundColor: '#FC541C',
                }}
                _selected={{
                  backgroundColor: '#FC541C',
                }}
                mr={3}
                onClick={onClose}
              >
                {' '}
                <Text fontSize={['10px', '10px', '12px', '14px']}>
                  Countinue Shopping
                </Text>
              </Button>
              <Button
                width={['150px', '100px', 'unset', 'unset']}
                onClick={() =>
                  router.push({
                    pathname: '/checkout',
                  })
                }
                variant='ghost'
                _hover={{
                  backgroundColor: '#FC541C',
                }}
                _selected={{
                  backgroundColor: '#FC541C',
                }}
              >
                <Text fontSize={['10px', '10px', '12px', '14px']}>
                  Proceed to Checkout{' '}
                </Text>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default DetailedTee;

import {
  Box,
  Flex,
  Grid,
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
  Select,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TeesData } from '../../constant';
import '@fontsource/nunito';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import CartItem from '../../components/CartItem';
import { MdWarning } from 'react-icons/md';
import { useWeb3React } from '@web3-react/core';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../../utils/firebase';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import Account from '../../components/Account';
import { removeAllItemsFromCart } from '../../store/cart-slice';
import { countries } from '../../constant/countries';
import { continents } from '../../constant/continents';
import { shippingCost } from '../../constant/continents';
declare var window: any;

const Checkout: NextPage = () => {
  const { account, library, chainId } = useWeb3React();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  // state for success
  const [country, setCountry] = useState(countries);
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  let totalAmount = cartItems
    ?.map((item) => item.totalPrice)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  let totalWeight = cartItems
    ?.map((item) => item.totalWeight)
    .reduce((a, b) => a + b, 0);

  const Continent = watch('continent');

  const getContinet = shippingCost.find(
    (item) => item?.continent === Continent
  );

  const finalShipping = (totalWeight * getContinet?.price!) / 1000;
  const finalAmount = (Number(totalAmount) + finalShipping).toFixed(2);

  const changeNetwork = async () => {
    if (window.ethereum.networkVersion !== 250) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ethers.utils.hexlify(250) }],
        });
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Fantom Opera',
                chainId: ethers.utils.hexlify(250),
                nativeCurrency: {
                  name: 'FTM',
                  decimals: 18,
                  symbol: 'FTM',
                },
                rpcUrls: ['https://rpc.fantom.network/'],
                blockExplorerUrls: ['https://ftmscan.com/'],
              },
            ],
          });
        }
      }
    }
  };

  async function getBalance() {
    setIsLoading(true);

    try {
      const usdc = new ethers.Contract(
        '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // ftm
        [
          'function balanceOf(address _owner) public view returns (uint256 balance)',
          'function transfer(address _to, uint256 _value) public returns (bool success)',
        ],
        library.getSigner()
      );
      const balance = await usdc.balanceOf(account);
      const formattedBalance = ethers.utils.formatUnits(balance, 6);
      const amount = ethers.utils.parseUnits(String(finalAmount), 6);

      if (totalAmount > +formattedBalance) {
        toast.error(
          `Insufficient balance to send ${finalAmount} USDC , You have ${formattedBalance} USDC. Please add more funds to your wallet.`,
          {
            position: 'top-right',
            autoClose: 6000,
            theme: 'dark',
          }
        );
        setIsLoading(false);
        return;
      }
      const tx = await usdc.transfer(
        '0xe92b2A3eD23D400465211E05062d0Abce7e9cccd',
        amount
      );
      await tx.wait();
      // await writeUserData();

      toast.success(
        `You have successfully sent ${finalAmount} USDC to the contract.`,
        {
          position: 'top-right',
          autoClose: 4000,
          theme: 'dark',
        }
      );
      await onClose();
      await onSecondModalOpen();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, {
        position: 'top-right',
        autoClose: 4000,
        theme: 'dark',
      });
    }
    setIsLoading(false);
  }
  const removeAllItemHandler = () => {
    dispatch(removeAllItemsFromCart());
  };

  async function onSubmit(e: any) {
    onOpen();
  }

  async function writeUserData() {
    try {
      const userId = uuidv4();
      const userRef = database.ref(`merchstore/${userId}`);
      await userRef.set({
        name: getValues('name'),
        email: getValues('email'),
        address: getValues('address'),
        address2: getValues('address2') || '',
        city: getValues('city'),
        state: getValues('state'),
        pincode: getValues('pin'),
        continent: Continent,
        country: getValues('country'),
        purchased_items: cartItems,
        total_cart: `${totalAmount} USDC`,
        shipping_cost: `${finalShipping} USDC`,
        total_amount: `${finalAmount} USDC`,
      });
      console.log('success');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box bg={'#1F1F1F'} pb='30px' height={cartItems.length ? 'auto' : '100vh'}>
      <Flex
        justifyContent={'center'}
        direction={['column-reverse', 'column-reverse', 'row', 'row']}
        alignItems='center'
      >
        {cartItems.length && (
          <Flex
            width={['auto', 'unset', '700px', '700px']}
            direction={'column'}
          >
            <Flex justifyContent={'center'}>
              {' '}
              <Text
                color={'#FC541C'}
                fontSize={'30px'}
                fontWeight={'bold'}
                mb={'20px'}
                mt={'20px'}
                fontFamily={'Nunito'}
              >
                Checkout
              </Text>
            </Flex>
            <Flex justifyContent={'center'} pl='auto'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors?.email} isRequired>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel
                      htmlFor='email'
                      className='form-label'
                      color={'white'}
                    >
                      Email address
                    </FormLabel>
                    <Input
                      color={'white'}
                      type='email'
                      id='email'
                      placeholder='Email'
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'invalid email address',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {(errors?.email?.message as ReactNode) || null}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors?.name} isRequired>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel htmlFor='name' color={'white'}>
                      Name
                    </FormLabel>
                    <Input
                      color={'white'}
                      id='name'
                      placeholder='Name'
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 3,
                          message: 'Minimum length should be 4',
                        },
                        validate: (value) => {
                          if (value.trim().length === 0) {
                            return 'No White Space allowed';
                          }
                          return true;
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {(errors?.name?.message as ReactNode) || null}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors?.address} isRequired>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel htmlFor='address' color={'white'}>
                      Street address
                    </FormLabel>
                    <Input
                      color={'white'}
                      id='address'
                      placeholder='Street address'
                      {...register('address', {
                        required: 'Address is required',
                        minLength: {
                          value: 4,
                          message: 'Minimum length should be 4',
                        },
                        validate: (value) => {
                          if (value.trim().length === 0) {
                            return 'No White Space allowed';
                          }
                          return true;
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {(errors?.address?.message as ReactNode) || null}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <FormControl>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel htmlFor='address2' color={'white'}>
                      Apt / suite / building (Optional)
                    </FormLabel>
                    <Input
                      color={'white'}
                      id='address'
                      placeholder='Apt / suite / building (Optional)'
                      {...register('address2')}
                    />
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors?.continent} isRequired>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel htmlFor='continent' color={'white'}>
                      {' '}
                      Select Continent
                    </FormLabel>
                    <Select
                      color={'white'}
                      {...register('continent', {
                        required: 'Continent is required',
                      })}
                    >
                      {' '}
                      <option style={{ color: 'black' }} disabled selected>
                        Continent
                      </option>
                      {continents?.map((item) => {
                        return (
                          <option
                            style={{ color: 'black' }}
                            key={item?.continent}
                          >
                            {item?.continent}
                          </option>
                        );
                      })}
                    </Select>
                    <FormErrorMessage>
                      {(errors?.continent?.message as ReactNode) || null}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors?.country} isRequired>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel htmlFor='country' color={'white'}>
                      {' '}
                      Select Country
                    </FormLabel>
                    <Select
                      color={'white'}
                      {...register('country', {
                        required: 'Country is required',
                      })}
                    >
                      <option style={{ color: 'black' }} disabled selected>
                        {' '}
                        Country
                      </option>
                      {country?.map((item) => {
                        return (
                          <option style={{ color: 'black' }} key={item.country}>
                            {item.country}
                          </option>
                        );
                      })}
                    </Select>
                    <FormErrorMessage>
                      {(errors?.country?.message as ReactNode) || null}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors?.city} isRequired>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel htmlFor='city' color={'white'}>
                      City{' '}
                    </FormLabel>
                    <Input
                      color={'white'}
                      id='city'
                      placeholder='City'
                      {...register('city', {
                        required: 'City is required',
                        validate: (value) => {
                          if (value.trim().length === 0) {
                            return 'No White Space allowed';
                          }
                          return true;
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {(errors?.city?.message as ReactNode) || null}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors?.state} isRequired>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel htmlFor='state' color={'white'}>
                      State{' '}
                    </FormLabel>
                    <Input
                      color={'white'}
                      id='country'
                      placeholder='State / Province / Region'
                      {...register('state', {
                        required: 'State is required',
                        validate: (value) => {
                          if (value.trim().length === 0) {
                            return 'No White Space allowed';
                          }
                          return true;
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {(errors?.state?.message as ReactNode) || null}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors?.pin} isRequired>
                  <Flex
                    justifyContent={'space-between'}
                    direction='column'
                    m='5px'
                  >
                    <FormLabel htmlFor='pin' color={'white'}>
                      Zip{' '}
                    </FormLabel>
                    <Input
                      color={'white'}
                      id='country'
                      placeholder='zip / postal code'
                      {...register('pin', {
                        required: 'Pincode is required',
                        validate: (value) => {
                          if (value.trim().length === 0) {
                            return 'No White Space allowed';
                          }
                          return true;
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {(errors?.pin?.message as ReactNode) || null}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>

                <Button
                  disabled={!cartItems.length}
                  mt={4}
                  backgroundColor={'#1F1F1F'}
                  border='1px solid #FC541C'
                  _hover={{
                    backgroundColor: '#FC541C',
                  }}
                  _selected={{
                    backgroundColor: '#FC541C',
                  }}
                  type='submit'
                >
                  <Text color={'white'}>Place Order</Text>
                </Button>
              </form>
            </Flex>
          </Flex>
        )}
        <Flex direction={'column'} width={['unset', 'unset', 'unset', '500px']}>
          <Flex justifyContent={'center'} mb='15px'>
            <Text
              color={'#FC541C'}
              fontSize={'30px'}
              fontFamily={'Nunito'}
              fontWeight={'bold'}
            >
              Order Summary
            </Text>
          </Flex>

          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.name,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price,
                size: item.size,
                image: item.image,
                weight: item.weight,
                totalWeight: item.totalWeight,
              }}
            />
          ))}

          {cartItems.length && (
            <Flex direction={'column'} mr={'10px'}>
              <Flex mt={'10px'} justifyContent={'space-between'}>
                <Text
                  color={'white'}
                  fontSize={'18px'}
                  fontFamily={'Nunito'}
                  fontWeight={'bold'}
                >
                  Cart Total
                </Text>
                <Text
                  color={'white'}
                  fontSize={'18px'}
                  fontFamily={'Nunito'}
                  fontWeight={'bold'}
                >
                  {totalAmount} USDC{' '}
                </Text>
              </Flex>
              {!finalShipping && (
                <Flex mt={'10px'} justifyContent={'space-between'}>
                  <Text
                    color={'red'}
                    fontSize={'12px'}
                    fontFamily={'Nunito'}
                    fontWeight={'bold'}
                  >
                    * Shippng Cost will be calculated based on your location
                  </Text>
                </Flex>
              )}

              {finalShipping && (
                <Flex mt={'10px'} justifyContent={'space-between'}>
                  <Text
                    color={'white'}
                    fontSize={'18px'}
                    fontFamily={'Nunito'}
                    fontWeight={'bold'}
                  >
                    Shipping Charges:
                  </Text>
                  <Text
                    color={'white'}
                    fontSize={'18px'}
                    fontFamily={'Nunito'}
                    fontWeight={'bold'}
                  >
                    {finalShipping} USDC{' '}
                  </Text>
                </Flex>
              )}
              <Flex
                mt={'10px'}
                justifyContent={'space-between'}
                height={'2px'}
                borderRadius={'5px'}
                width={'100%'}
                bgColor={'white'}
              />
              {finalShipping && (
                <Flex mt={'10px'} justifyContent={'space-between'}>
                  <Text
                    color={'white'}
                    fontSize={'20px'}
                    fontFamily={'Nunito'}
                    fontWeight={'bold'}
                  >
                    Order Total
                  </Text>
                  <Text
                    color={'white'}
                    fontSize={'20px'}
                    fontFamily={'Nunito'}
                    fontWeight={'bold'}
                  >
                    {finalAmount} USDC{' '}
                  </Text>
                </Flex>
              )}
            </Flex>
          )}

          {cartItems.length === 0 && (
            <Flex
              justifyContent={'center'}
              gap={'20px'}
              direction={'column'}
              alignItems={'center'}
            >
              <Text color={'white'} fontSize={'20px'} p={'10px'}>
                {' '}
                Your cart is empty, Please Add Item to Cart
              </Text>
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
          )}
        </Flex>
        <Modal
          variant={'wide'}
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent width={['340px', '300px', 'unset', 'unset']}>
            <ModalHeader>
              <Flex
                gap={'20px'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Icon as={MdWarning} fontSize={'50px'} color='red.700' />
              </Flex>
            </ModalHeader>
            <ModalBody>
              <Flex
                direction={'column'}
                justifyContent={'center'}
                gap={'10px'}
                mb={'20px'}
              >
                <Text
                  as={'span'}
                  fontWeight='bold'
                  fontSize={['14px', '14px', '16px', '20px']}
                >
                  Before ordering, please review and accept these terms:
                </Text>
                <Text
                  as={'span'}
                  fontWeight='normal'
                  fontSize={['14px', '14px', '16px', '16px']}
                >
                  <ul>
                    <li>Make sure you have entered correct Address details.</li>
                    <li>
                      Make sure to only interact and send your order payment to
                      the UltiBets Treasury Address:
                      <Text fontWeight={'extrabold'} fontSize={'17px'}>
                        0xe92b2A3eD23D400465211E05062d0Abce7e9cccd
                      </Text>
                    </li>
                    <li>
                      Make sure to only interact and send your order payment in
                      USDC on the
                      <Text
                        as={'span'}
                        fontWeight={'extrabold'}
                        fontSize={'17px'}
                      >
                        {' '}
                        Fantom Blockchain.
                      </Text>
                    </li>
                  </ul>
                </Text>
                {chainId !== 250 && (
                  <Button
                    backgroundColor={'#1F1F1F'}
                    border='1px solid #FC541C'
                    _hover={{
                      backgroundColor: '#FC541C',
                    }}
                    _selected={{
                      backgroundColor: '#FC541C',
                    }}
                    onClick={() => changeNetwork()}
                  >
                    <Text>Change to FTM Mainnet</Text>
                  </Button>
                )}
              </Flex>
              <Flex justifyContent={'space-between'} mt={'10px'} mb={'10px'}>
                <Button
                  variant='ghost'
                  _hover={{
                    backgroundColor: '#FC541C',
                  }}
                  _selected={{
                    backgroundColor: '#FC541C',
                  }}
                  onClick={onClose}
                >
                  {' '}
                  <Text fontSize={['12px', '12px', '12px', '15px']}>
                    Cancel
                  </Text>
                </Button>
                {account ? (
                  <Button
                    loadingText={'Transaction in progress...'}
                    isLoading={isLoading}
                    onClick={async () => {
                      await getBalance();
                      await writeUserData();
                    }}
                    variant='ghost'
                    _hover={{
                      backgroundColor: '#FC541C',
                    }}
                    _selected={{
                      backgroundColor: '#FC541C',
                    }}
                  >
                    <Text fontSize={['12px', '12px', '12px', '15px']}>
                      I Understand, Confirm Order{' '}
                    </Text>
                  </Button>
                ) : (
                  <Account />
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          variant={'wide'}
          blockScrollOnMount={false}
          isOpen={isSecondModalOpen}
          onClose={onSecondModalClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent width={['300px', '300px', 'unset', 'unset']}>
            <ModalHeader>
              <Flex
                gap={'20px'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text fontSize={'24px'} color={'red'} fontFamily={''}>
                  Order Confirmed
                </Text>
              </Flex>
            </ModalHeader>
            <ModalBody>
              <Flex
                direction={'column'}
                justifyContent={'center'}
                gap={'10px'}
                mb={'10px'}
              >
                <Text fontSize={['14px', '14px', '16px', '16px']}>
                  Order successully completed!
                </Text>
                <Text fontSize={['14px', '14px', '16px', '16px']}>
                  Thank you for your order at UltiBets Merch Store.
                </Text>
                <Text fontSize={['14px', '14px', '16px', '16px']}>
                  Your order will be shipped and delivered to your address as
                  soon as possible{' '}
                </Text>
                <Text fontSize={['14px', '14px', '16px', '16px']}>
                  You will receive a confirmation email for your order shortly,
                  see you soon shopping again UltiBettor!
                </Text>

                <Button
                  mt={'30px'}
                  backgroundColor={'#1F1F1F'}
                  border='1px solid #FC541C'
                  _hover={{
                    backgroundColor: '#FC541C',
                  }}
                  _selected={{
                    backgroundColor: '#FC541C',
                  }}
                  onClick={async () => {
                    await removeAllItemHandler();

                    await router.push('/merch-store');
                  }}
                >
                  <Text>
                    <Text fontWeight={'extrabold'} fontSize={'20px'}>
                      Continue Shopping
                    </Text>
                  </Text>
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};
export default Checkout;

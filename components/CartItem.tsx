/* eslint-disable @next/next/no-img-element */
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../store/cart-slice';

const CartItem = (props: any) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price, id, size, image, weight } = props.item;

  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        id,
        title,
        price,
        size: size || 'Unique Size',
        weight,
      })
    );
  };

  const removeItemHandler = () => {
    const newSize = size ? size : 'Unique Size';

    dispatch(removeItemFromCart({ id, size: newSize }));
  };

  return (
    <>
      <Flex
        justifyContent={'space-between'}
        direction={[
          'column-reverse',
          'column-reverse',
          'column-reverse',
          'row',
        ]}
      >
        <Flex direction={'column'} justifyContent='center' gap={'5px'}>
          <Text color={'white'} fontSize={'18px'} fontWeight={'thin'}>
            Description:<strong> {title}</strong>
          </Text>
          <Text color={'white'} fontSize={'18px'} fontWeight={'thin'}>
            Size: <strong>{size}</strong>
          </Text>
          <Text color={'white'} fontSize={'18px'} fontWeight={'thin'}>
            Quantity:{' '}
            <strong>
              {quantity} x {price} USDC
            </strong>
          </Text>

          <Text color={'white'} fontSize={'18px'} fontWeight={'thin'}>
            Sub Total: <strong>{total.toFixed(2)} USDC</strong>
          </Text>
          <Flex>
            {' '}
            <IconButton
              mt={'2px'}
              aria-label='Search database'
              onClick={removeItemHandler}
              icon={<MinusIcon />}
            />{' '}
            <Flex alignItems={'center'}>
              <Text color={'white'} m={'10px'}>
                {quantity}
              </Text>
              <IconButton
                aria-label='Search database'
                onClick={addItemHandler}
                icon={<AddIcon />}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          border={'1px solid #FFFFFF'}
          boxShadow={'inner'}
          borderRadius={'5px'}
          margin='20px'
          justifyContent={'center'}
          alignItems={'center'}
          _hover={{
            boxShadow: '0px 0px 10px #FC541C',
          }}
          cursor={'pointer'}
        >
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            cursor={'pointer'}
          >
            <Image
              src={image}
              width={['full', 'unset', 'unset', 'full']}
              height={['full', 'unset', 'unset', 'full']}
              alt={title}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CartItem;

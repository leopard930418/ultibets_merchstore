import { Box, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { RootState } from '../store';

const Detailed = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  return (
    <Box bg={'#1F1F1F'} pb='30px'>
      <div>
        <h1>Detailed</h1>
        <div>
          <div>totalItems:{totalItems}</div>
        </div>
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
            }}
          />
        ))}{' '}
        <div>{!cartItems && <Text> Your cart is empty</Text>} </div>
      </div>
    </Box>
  );
};

export default Detailed;

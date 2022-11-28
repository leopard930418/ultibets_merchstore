import { createSlice } from '@reduxjs/toolkit';

export type CartState = {
  items: Array<any>;
  totalQuantity: number;
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          size: newItem.size,
          image: newItem.image,
          weight: newItem.weight,
          totalWeight: newItem.weight,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        existingItem.totalWeight = existingItem.totalWeight + newItem.weight;
      }
    },
    removeItemFromCart(state, action) {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      state.totalQuantity--;
      if (existingItem?.quantity === 1) {
        state.items = state.items.filter(
          (item) =>
            item.id !== action.payload.id || item.size !== action.payload.size
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        existingItem.totalWeight =
          existingItem.totalWeight - existingItem.weight;
      }
    },
    removeAllItemsFromCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const {
  replaceCart,
  addItemToCart,
  removeItemFromCart,
  removeAllItemsFromCart,
} = cartSlice.actions;

export default cartSlice;

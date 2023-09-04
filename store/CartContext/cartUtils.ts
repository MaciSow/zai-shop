import { CartItem } from '@/store/CartContext/cartTypes';

export const getCartWithNewItem = (cartItems: CartItem[], item: CartItem) => {
  let itemCount = 0;

  const filteredList = cartItems.filter((listItem) => {
    if (listItem.id === item.id) {
      itemCount = listItem.count;
      return false;
    }
    return true;
  });

  itemCount++;
  return [...filteredList, { ...item, count: itemCount }];
};

export const getCartWithoutItem = (cartItems: CartItem[], itemId: string) =>
  cartItems.filter((listItem) => listItem.id !== itemId);

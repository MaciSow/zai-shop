import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { CartItem, CartState } from '@/store/CartContext/cartTypes';
import { getCartWithNewItem, getCartWithoutItem } from '@/store/CartContext/cartUtils';

const getCartItemsFromStorage = () => {
  const localStorageItems = localStorage.getItem('shopping_cart');

  if (!localStorageItems) {
    return [];
  }

  try {
    return JSON.parse(localStorageItems);
  } catch (e) {
    console.error(e);
    return [];
  }
};

const setCartItemInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
};

const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [firstFlag, setFirstFlag] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []);

  useEffect(() => {
    if (firstFlag) {
      setFirstFlag(false);
      if (cartItems.length === 0) {
        return;
      }
    }

    setCartItemInStorage(cartItems);
  }, [cartItems, firstFlag]);

  const addItem = (item: CartItem) => {
    setCartItems((prevState) => getCartWithNewItem(prevState, item));
  };

  const removeItem = (id: string) => {
    setCartItems((prevState) => getCartWithoutItem(prevState, id));
  };

  const contextValue: CartState = {
    items: cartItems,
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCartState = () => {
  const cartState = useContext(CartContext);

  if (!cartState) {
    throw new Error('You forgot CartContextProvider');
  }

  return cartState;
};

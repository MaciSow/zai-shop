import {createContext, PropsWithChildren, useContext, useState} from "react";

interface CartItem {
    price: number,
    title: string,
}

interface CartState {
    items: CartItem[],
    addItem: (item: CartItem) => void
}

const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({children}: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([{
        price: 23.33,
        title: "jeans"
    }])


    const addItem = (item: CartItem) => {
        setCartItems((prevState) => [...prevState, item])
    };

    const contextValue: CartState = {
        items: cartItems,
        addItem
    }

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export const useCartState = () => {
    const cartState = useContext(CartContext);

    if (!cartState) {
        throw new Error('You forgot CartContextProvider')
    }

    return cartState
}
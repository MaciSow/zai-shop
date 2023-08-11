import {createContext, PropsWithChildren, useContext, useState} from "react";

interface CartItem {
    id: string,
    price: number,
    title: string,
    count: number
}

interface CartState {
    items: CartItem[],
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
}

const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({children}: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])


    const addItem = (item: CartItem) => {
        setCartItems((prevState) => {
            let itemCount = 0

            const filteredList = prevState.filter((listItem) => {
                if (listItem.id === item.id) {
                    itemCount = listItem.count
                    return false
                }
                return true
            })

            itemCount++
            return [...filteredList, {...item, count: itemCount}]
        })
    };

    const removeItem = (id: string) => {
        setCartItems((prevState) =>
            prevState.filter((listItem) => listItem.id !== id)
        )
    }

    const contextValue: CartState = {
        items: cartItems,
        addItem,
        removeItem
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
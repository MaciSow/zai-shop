import {useCartState} from "@/store/CartContext";

const CartPage = () => {
    const {items} = useCartState()

    return (
        <ul>
            {items.map((item,index) => (
                <li className="p-2 flex gap-2 justify-between w-1/2 border-b-2 border-blue-400" key={index}>
                    <span>{item.title}</span>
                    <span>{item.price}</span>
                </li>))}
        </ul>
    )

}

export default CartPage

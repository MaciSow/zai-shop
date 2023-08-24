import { useCartState } from '@/store/CartContext';

const CartPage = () => {
  const { items, removeItem } = useCartState();

  return (
    <ul>
      {items.map(({ price, title, count, id }) => (
        <li className="p-2 flex gap-2 justify-between w-1/2 border-b-2 border-blue-400" key={id}>
          <span>
            <b>{count}x</b> {title}
          </span>
          <div>
            <span>{price}</span>
            <button
              className="ml-2 right-1 top-1 bg-red-800 text-white py-1 px-2 rounded-md"
              onClick={() => removeItem(id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartPage;

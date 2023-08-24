import { ProductData } from '@/components/ProductDetails';
import Link from 'next/link';
import Image from 'next/image';
import { useCartState } from '@/store/CartContext';

export type ProductListItemData = Pick<ProductData, 'id' | 'title' | 'imageSrc' | 'imageAlt'>;

interface Props {
  data: ProductListItemData;
}

export const ProductListItem = ({ data }: Props) => {
  const { addItem } = useCartState();

  const handleClick = () => {
    addItem({
      id: data.id,
      title: data.title,
      price: 1231,
      count: 1,
    });
  };

  return (
    <Link
      href={`/products/${data.id}`}
      className="relative flex flex-col justify-between gap-4 p-4 border-blue-300 border-2 rounded-md"
    >
      <span className="text-xl font-bold">{data.title}</span>
      <div className="relative w-full h-[300px] bg-white">
        <Image
          src={data.imageSrc}
          alt={data.imageAlt}
          fill
          className="object-contain"
          sizes="300px"
          priority
        />
      </div>
      <button
        className="absolute right-1 top-1 bg-gray-700 text-white py-1 px-2 rounded-md"
        onClick={handleClick}
      >
        Add
      </button>
    </Link>
  );
};

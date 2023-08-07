import {ProductData} from "@/components/ProductDetails";
import Link from "next/link";

export type ProductListItemData = Pick<ProductData, 'id' | 'title' | 'imageSrc' | 'imageAlt'>

interface Props {
    data: ProductListItemData
}

export const ProductListItem = ({data}: Props) => {
    return (
        <Link href={`/products/${data.id}`} className="flex flex-col gap-4 p-4 border-blue-300 border-2 rounded-md">
            <span className="text-xl font-bold">{data.title}</span>
            <img src={data.imageSrc} alt={data.imageAlt}/>
        </Link>)
}
import {ProductData} from "@/components/ProductDetails";
import Link from "next/link";
import Image from "next/image";

export type ProductListItemData = Pick<ProductData, 'id' | 'title' | 'imageSrc' | 'imageAlt'>

interface Props {
    data: ProductListItemData
}

export const ProductListItem = ({data}: Props) => {
    return (
        <Link href={`/products/${data.id}`}
              className="flex flex-col justify-between gap-4 p-4 border-blue-300 border-2 rounded-md">
            <span className="text-xl font-bold">{data.title}</span>
            <div className="relative w-full h-[300px] bg-white">
                <Image src={data.imageSrc} alt={data.imageAlt} fill className="object-contain" sizes="300px" priority/>
            </div>
        </Link>)
}
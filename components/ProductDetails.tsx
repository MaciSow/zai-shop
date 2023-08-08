import Image from "next/image";

export interface ProductData {
    id: number
    title: string,
    imageSrc: string,
    imageAlt: string,
    description: string,
    rating: number
}

interface ProductProps {
    data: ProductData
}

export const ProductDetails = ({data}: ProductProps) => {
    return (
        <div className="flex flex-col gap-4 p-4 border-blue-300 border-2 rounded-md">
            <span className="text-xl font-bold">{data.title}</span>
            <div className="relative w-full h-[500px] bg-white">
                <Image src={data.imageSrc} alt={data.imageAlt} fill className="object-contain" sizes="500px" priority/>
            </div>
            <span>{data.description}</span>
            <span className="text-blue-800 font-bold">{data.rating}</span>
        </div>)
}
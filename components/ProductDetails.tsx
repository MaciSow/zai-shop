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
            <img src={data.imageSrc} alt={data.imageAlt}/>
            <span>{data.description}</span>
            <span className="text-blue-800 font-bold">{data.rating}</span>
        </div>)
}
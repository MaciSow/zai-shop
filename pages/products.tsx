import {InferGetServerSidePropsType} from "next";
import {ProductListItem, ProductListItemData} from "@/components/ProductListItem";

export interface StoreApiResponse {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductsPage = ({data}: InferGetServerSidePropsType<typeof getStaticProps>) => {
    const getPreparedData = (storeData: StoreApiResponse): ProductListItemData => (
        {
            id: storeData.id,
            title: storeData.title,
            imageSrc: storeData.image,
            imageAlt: storeData.title
        }
    )

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(product => <ProductListItem key={product.id} data={getPreparedData(product)}/>)}
    </div>
}

export default ProductsPage

export const getStaticProps = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/`);
    const data: StoreApiResponse[] = await res.json();

    return {
        props: {
            data
        }
    }
}

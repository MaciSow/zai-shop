import {GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {StoreApiResponse} from "@/pages/products";
import {ProductData, ProductDetails} from "@/components/ProductDetails";

const ProductIdPage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (!data) {
        return <div>no data!!!</div>
    }

    const preparedData: ProductData = {
        id: data.id,
        title: data.title,
        description: data.description,
        imageSrc: data.image,
        imageAlt: data.title,
        rating: data.rating.rate,
    }

    return <div>
        <ProductDetails data={preparedData}/>
    </div>
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
    const res = await fetch(`https://fakestoreapi.com/products/`);
    const data: StoreApiResponse [] = await res.json();

    return {
        paths: data.map((product) => ({params: {productId: product.id.toString()}})),
        fallback: false
    }
}

export const getStaticProps = async ({params}: GetStaticPropsContext<{ productId: string }>) => {
    if (!params?.productId) {
        return {
            props: {},
            notFound: true
        }
    }

    const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
    const data: StoreApiResponse | null = await res.json();

    return {
        props: {
            data
        }
    }
}

export default ProductIdPage
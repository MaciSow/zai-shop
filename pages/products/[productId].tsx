import {GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {StoreApiResponse} from "@/pages/products";
import {ProductData, ProductDetails} from "@/components/ProductDetails";
import {NextSeo} from "next-seo";

const ProductIdPage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (!data) {
        return <div>no data!!!</div>
    }

    const preparedData: ProductData = {
        id: data.id,
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        imageSrc: data.image,
        imageAlt: data.title,
        rating: data.rating.rate,
    }

    return <div>
        <NextSeo title={data.title} description={data.description}/>
        <ProductDetails data={preparedData}/>
    </div>
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
    const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
    const data: StoreApiResponse [] = await res.json();

    return {
        paths: data.map((product) => ({params: {productId: product.id}})),
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

    const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.productId}`);
    const data: StoreApiResponse | null = await res.json();

    return {
        props: {
            data
        }
    }
}

export default ProductIdPage
import {InferGetServerSidePropsType} from "next";
import {ProductListItem, ProductListItemData} from "@/components/ProductListItem";
import {apolloClient} from "@/graphql/apolloClient";
import {
    GetAllProductsDocument,
    GetAllProductsQuery
} from "@/generated/types-and-hooks";

type ProductsItem = GetAllProductsQuery["products"][number]

const ProductsPage = ({data}: InferGetServerSidePropsType<typeof getStaticProps>) => {
    const getPreparedData = (storeData: ProductsItem): ProductListItemData => (
        {
            id: storeData.slug,
            title: storeData.name,
            imageSrc: storeData.images[0].url,
            imageAlt: storeData.name
        }
    )

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.products.map(product => <ProductListItem key={product.slug} data={getPreparedData(product)}/>)}
    </div>
}

export default ProductsPage

export const getStaticProps = async () => {
    const {data} = await apolloClient.query<GetAllProductsQuery>({
        query: GetAllProductsDocument
    })
    return {
        props: {
            data
        }
    }
}

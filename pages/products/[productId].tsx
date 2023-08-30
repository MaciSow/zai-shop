import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductData, ProductDetails } from '@/components/ProductDetails';
import { NextSeo } from 'next-seo';
import { serialize } from 'next-mdx-remote/serialize';
import { apolloClient } from '@/graphql/apolloClient';
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductDetailsBySlugQueryVariables,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
} from '@/generated/types-and-hooks';
import { ReviewForm } from '@/components/ReviewForm';
import { ProductReviewList } from '@/components/ProductReviewList';

const ProductIdPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>no data!!!</div>;
  }

  const preparedData: ProductData = {
    id: data.slug,
    title: data.name,
    description: data.description,
    longDescription: data.longDescription,
    imageSrc: data.images[0].url,
    imageAlt: data.name,
    rating: data.price / 100,
  };

  return (
    <div>
      <NextSeo title={data.name} description={data.description} />
      <ProductDetails data={preparedData} />
      <ReviewForm slug={data.slug} />
      <ProductReviewList slug={data.slug} />
    </div>
  );
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  });

  return {
    paths: data.products.map((product) => ({ params: { productId: product.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query<
    GetProductDetailsBySlugQuery,
    GetProductDetailsBySlugQueryVariables
  >({
    query: GetProductDetailsBySlugDocument,
    variables: {
      slug: params.productId,
    },
  });

  if (!data || !data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { product } = data;

  return {
    props: {
      data: { ...product, longDescription: await serialize(product.description) },
    },
  };
};

export default ProductIdPage;

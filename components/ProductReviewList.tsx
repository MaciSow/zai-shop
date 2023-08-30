import { useGetProductReviewsQuery } from '@/generated/types-and-hooks';

interface Props {
  slug: string;
}

export const ProductReviewList = ({ slug }: Props) => {
  const { data } = useGetProductReviewsQuery({
    variables: {
      slug,
    },
  });

  if (!data?.product) {
    return null;
  }

  return (
    <ul>
      {data.product.reviews.map((review) => (
        <li key={review.id}>{review.headline}</li>
      ))}
    </ul>
  );
};

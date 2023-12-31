import Image from 'next/image';
import { CustomMarkdown } from '@/components/CustomMarkdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface ProductData {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  longDescription: MDXRemoteSerializeResult;
  rating: number;
}

interface ProductProps {
  data: ProductData;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-bold">{data.title}</span>
      <div className="relative w-full h-[500px] bg-white">
        <Image
          src={data.imageSrc}
          alt={data.imageAlt}
          fill
          className="object-contain"
          sizes="500px"
          priority
        />
      </div>
      <span>{data.description}</span>
      <CustomMarkdown text={data.longDescription} />
      <span className="text-blue-800 font-bold">{data.rating}</span>
    </div>
  );
};

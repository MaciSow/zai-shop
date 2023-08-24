import { NextSeoProps } from 'next-seo';

const title = 'Zai-Shop';
const description = 'The best shop ever.';

const NextSeoConfig: NextSeoProps = {
  title,
  description,
  openGraph: {
    url: 'https://zai-shop.vercel.app/',
    title,
    description,
    siteName: title,
  },
};

export default NextSeoConfig;

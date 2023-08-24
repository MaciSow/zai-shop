import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import { DefaultSeo } from 'next-seo';
import SeoConfig from '@/next-seo.config';
import { CartContextProvider } from '@/store/CartContext';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartContextProvider>
        <Layout>
          <DefaultSeo {...SeoConfig} />
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </ApolloProvider>
  );
}

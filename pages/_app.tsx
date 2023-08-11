import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Layout} from "@/components/Layout";
import {DefaultSeo} from "next-seo";
import SeoConfig from "@/next-seo.config"
import {CartContextProvider} from "@/store/CartContext";

export default function App({Component, pageProps}: AppProps) {
    return (
        <CartContextProvider>
            <Layout>
                <DefaultSeo {...SeoConfig}/>
                <Component {...pageProps} />
            </Layout>
        </CartContextProvider>
    )
}

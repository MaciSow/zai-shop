import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";

export default function Home() {
    return (
        <div className="flex flex-col bg-teal-100 min-h-screen">
            <Header/>
            <main className="flex-grow max-w-md mx-auto w-full">hello</main>
            <Footer/>
        </div>
    )
}

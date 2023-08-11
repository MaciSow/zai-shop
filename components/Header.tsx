import Link from "next/link";
import {useRouter} from "next/router";
import {CartBar} from "@/components/Cart/CartBar";

export const Header = () => {
    const {pathname} = useRouter()

    return <header className="flex justify-between bg-gray-700 px-4 py-2">
        <nav className="flex flex-row gap-4  text-white">
            <Link className={pathname === '/' ? "font-bold" : ''} href="/">
                Home
            </Link>
            <Link className={pathname === '/users' ? "font-bold" : ''} href="/users">
                Users
            </Link>
            <Link className={pathname === '/products' ? "font-bold" : ''} href="/products">
                Products
            </Link>
        </nav>
        <CartBar/>
    </header>
}
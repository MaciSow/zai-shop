import Link from "next/link";
import {useRouter} from "next/router";

export const Header = () => {
    const {pathname} = useRouter()

    return <header className="max-w-md mx-auto w-full">
        <nav className="flex flex-col gap-1 bg-gray-700 text-white px-4 py-2">
            <Link className={pathname === '/' ? "font-bold" : ''} href="/">
                Home
            </Link>
            <Link className={pathname === '/users' ? "font-bold" : ''} href="/users">
                Users
            </Link>
        </nav>
    </header>
}
import {ReactNode} from "react";

interface Props {
    children: ReactNode
}

export const Main = ({children}: Props) =>
    (
        <main className="flex-grow p-6">
            {children}
        </main>
    )
import { ReactNode } from "react";



export function Container({ children }: { children: ReactNode }) {
    return (
        <div className="w-full max-w-7xl px-4 mx-auto mt-5">
            { children }
        </div>
    )
}
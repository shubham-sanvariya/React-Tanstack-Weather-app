import {PropsWithChildren} from "react";
import Header from "./header.tsx";

const Layout = ({children}: PropsWithChildren) => {
    return (
        <div className={'bg-gradient-to-br from-background to-muted'}>
            <Header/>
            {/*px for horizontal padding & py for vertical*/}
            <main className={'min-h-screen container mx-auto px-4 py-8'}>
                {children}
            </main>
            <footer className={'border-t backdrop-blur py-12 supports-[backdrop-filter]: bg-background/60'}>
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>Made with love by shubh</p>
                </div>
            </footer>
        </div>
    )
}
export default Layout
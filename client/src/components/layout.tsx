import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
    return(
        <div className="flex flex-col items-center h-screen w-screen bg-foreground">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
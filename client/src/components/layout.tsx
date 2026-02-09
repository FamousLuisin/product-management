import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import BodyHead from "./bodyHead";

export default function Layout() {
    return(
        <div className="flex flex-col items-center h-screen w-screen bg-foreground gap-4">
            <Header />
            <BodyHead />
            <Outlet />
            <Footer />
        </div>
    )
}
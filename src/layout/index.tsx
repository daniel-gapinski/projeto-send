import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

export function Layout() {
    return (
        <>
       <Sidebar />
       <Outlet />
        </>
    )
}
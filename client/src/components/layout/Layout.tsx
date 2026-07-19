import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./footer";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg-secondary text-text-primary flex flex-col font-sans antialiased selection:bg-primary-light selection:text-primary">
            <Navbar
                onMenuClick={() => setSidebarOpen(true)}
            />

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-12 flex flex-col">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
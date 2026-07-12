import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {

    return (

        <div className="min-h-screen bg-slate-100">

            <Sidebar />

            <div className="ml-64">

                <Navbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}
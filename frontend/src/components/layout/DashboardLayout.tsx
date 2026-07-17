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

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">

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
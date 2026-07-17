import type { ReactNode } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">

            {/* Mobile Sidebar */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="p-0 w-64">
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="md:ml-64">
                <Navbar />

                <main className="p-4 md:p-8">
                    {children}
                </main>
            </div>

        </div>
    );
}
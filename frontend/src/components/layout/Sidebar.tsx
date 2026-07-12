import { Link } from "react-router-dom";

import {
    LayoutDashboard,
    Wallet,
    Receipt,
    PiggyBank,
    Bot,
} from "lucide-react";

const links = [

    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },

    {
        title: "Income",
        icon: Wallet,
        href: "/income",
    },

    {
        title: "Expenses",
        icon: Receipt,
        href: "/expenses",
    },

    {
        title: "Budget",
        icon: PiggyBank,
        href: "/budget",
    },

    {
        title: "AI Coach",
        icon: Bot,
        href: "/ai",
    },

];

export default function Sidebar() {

    return (

        <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white">

            <div className="border-b p-8">

                <h1 className="text-3xl font-bold">

                    GradFund

                </h1>

            </div>

            <nav className="mt-6 space-y-2 px-4">

                {

                    links.map((link) => {

                        const Icon = link.icon;

                        return (

                            <Link

                                key={link.href}

                                to={link.href}

                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-black"

                            >

                                <Icon size={20} />

                                {link.title}

                            </Link>

                        );

                    })

                }

            </nav>

        </aside>

    );

}
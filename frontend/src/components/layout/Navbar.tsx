import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {

    const {
        logout,
    } = useAuth();

    return (

        <header className="flex h-20 items-center justify-between border-b bg-white px-8">

            <div>

                <h2 className="text-2xl font-bold">

                    Dashboard

                </h2>

            </div>

            <button

                onClick={logout}

                className="rounded-lg bg-slate-900 px-5 py-2 text-white transition hover:bg-black"

            >

                Logout

            </button>

        </header>

    );

}
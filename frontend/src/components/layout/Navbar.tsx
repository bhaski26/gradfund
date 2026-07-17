import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

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

            <div className="flex items-center gap-4">

                <ProfileDropdown />

            </div>

        </header>

    );

}
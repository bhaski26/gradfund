import {
    LogOut,
    Settings,
    User,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfileDropdown() {

    const { logout } = useAuth();

    const email =
        localStorage.getItem("user_email") ??
        "Student";

    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <Button
                    variant="outline"
                    className="rounded-xl"
                >

                    👤 {email}

                </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64 rounded-xl"
            >

                <DropdownMenuLabel>

                    My Account

                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>

                    <User className="mr-2 h-4 w-4" />

                    Profile

                </DropdownMenuItem>

                <DropdownMenuItem>

                    <Settings className="mr-2 h-4 w-4" />

                    Settings

                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600"
                >

                    <LogOut className="mr-2 h-4 w-4" />

                    Logout

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );

}
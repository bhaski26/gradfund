import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    register as registerRequest,
    type RegisterRequest,
} from "@/services/auth";

export function useRegister() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function signUp(
        user: RegisterRequest,
    ) {
        try {
            setLoading(true);
            setError("");

            await registerRequest(user);

            navigate("/");
        } catch (err) {
            console.error(err);

            setError(
                "Unable to create account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        signUp,
        loading,
        error,
    };
}
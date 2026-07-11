import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";
import type { LoginRequest } from "../services/auth";

export function useLogin() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function signIn(
        credentials: LoginRequest,
    ) {

        try {

            setLoading(true);
            setError("");

            const response =
                await login(credentials);

            localStorage.setItem(
                "token",
                response.access_token,
            );

            navigate("/dashboard");

        } catch {

            setError(
                "Invalid email or password.",
            );

        } finally {

            setLoading(false);

        }
    }

    return {

        signIn,

        loading,

        error,

    };

}
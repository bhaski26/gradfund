import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginRequest } from "@/services/auth";
import type { LoginRequest } from "@/services/auth";

import { useAuth } from "@/contexts/AuthContext";

export function useLogin() {

    const navigate = useNavigate();

    const { login } = useAuth();

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
                await loginRequest(credentials);

            login(
                response.access_token,
            );

            navigate(
                "/dashboard"
            );

        } catch (err) {

            console.error(err);

            setError(
                "Invalid email or password."
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
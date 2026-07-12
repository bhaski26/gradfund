import { useEffect, useState } from "react";

import { getDashboard } from "@/services/dashboard";
import type { DashboardData } from "@/services/dashboard";

export function useDashboard() {

    const [data, setData] =
        useState<DashboardData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadDashboard() {

            try {

                const response =
                    await getDashboard();

                setData(response);

            } catch {

                setError(
                    "Failed to load dashboard."
                );

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    return {

        data,

        loading,

        error,

    };

}
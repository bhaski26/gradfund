import { useEffect, useState } from "react";

import {
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome,
} from "@/services/income";

import type {
    Income,
    CreateIncomeRequest,
    UpdateIncomeRequest,
} from "@/types/income";

export function useIncome() {
    const [income, setIncome] = useState<Income[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchIncome() {
        setLoading(true);
        setError("");

        try {
            const data = await getIncome();
            setIncome(data);
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to load income."
            );
        } finally {
            setLoading(false);
        }
    }

    async function addIncome(
        data: CreateIncomeRequest
    ) {
        setLoading(true);
        setError("");

        try {
            await createIncome(data);
            await fetchIncome();
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to create income."
            );
        } finally {
            setLoading(false);
        }
    }

    async function editIncome(
        id: number,
        data: UpdateIncomeRequest
    ) {
        setLoading(true);
        setError("");

        try {
            await updateIncome(id, data);
            await fetchIncome();
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to update income."
            );
        } finally {
            setLoading(false);
        }
    }

    async function removeIncome(id: number) {
        setLoading(true);
        setError("");

        try {
            await deleteIncome(id);
            await fetchIncome();
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to delete income."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchIncome();
    }, []);

    return {
        income,
        loading,
        error,
        fetchIncome,
        addIncome,
        editIncome,
        removeIncome,
    };
}
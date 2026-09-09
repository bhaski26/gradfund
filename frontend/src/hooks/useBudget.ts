import { useEffect, useState } from "react";

import {
    getBudget,
    createBudget,
    updateBudget,
} from "@/services/budget";

import type {
    Budget,
    CreateBudgetRequest,
    UpdateBudgetRequest,
} from "@/types/budget";

export function useBudget() {
    const [budget, setBudget] = useState<Budget | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchBudget() {
        setLoading(true);
        setError("");

        try {
            const data = await getBudget();
            setBudget(data);
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to load budget."
            );
        } finally {
            setLoading(false);
        }
    }

    async function addBudget(data: CreateBudgetRequest) {
        setLoading(true);
        setError("");

        try {
            const newBudget = await createBudget(data);
            setBudget(newBudget);
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to create budget."
            );
        } finally {
            setLoading(false);
        }
    }

    async function editBudget(data: UpdateBudgetRequest) {
        setLoading(true);
        setError("");

        try {
            const updatedBudget = await updateBudget(data);
            setBudget(updatedBudget);
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to update budget."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBudget();
    }, []);

    return {
        budget,
        loading,
        error,
        fetchBudget,
        addBudget,
        editBudget,
    };
}
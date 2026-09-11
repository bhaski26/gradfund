import { useEffect, useState } from "react";

import {
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
} from "@/services/budget";

import type {
    Budget,
    CreateBudgetRequest,
    UpdateBudgetRequest,
} from "@/types/budget";

export function useBudget() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchBudgets() {
        setLoading(true);
        setError("");

        try {
            const data = await getBudgets();
            setBudgets(data);
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to load budgets."
            );
        } finally {
            setLoading(false);
        }
    }

    async function addBudget(
        data: CreateBudgetRequest
    ) {
        setLoading(true);
        setError("");

        try {
            const newBudget = await createBudget(data);

            setBudgets((currentBudgets) => [
                newBudget,
                ...currentBudgets,
            ]);
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to create budget."
            );

            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function editBudget(
        id: number,
        data: UpdateBudgetRequest
    ) {
        setLoading(true);
        setError("");

        try {
            const updatedBudget = await updateBudget(
                id,
                data
            );

            setBudgets((currentBudgets) =>
                currentBudgets.map((budget) =>
                    budget.id === id
                        ? updatedBudget
                        : budget
                )
            );
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to update budget."
            );

            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function removeBudget(id: number) {
        setLoading(true);
        setError("");

        try {
            await deleteBudget(id);

            setBudgets((currentBudgets) =>
                currentBudgets.filter(
                    (budget) => budget.id !== id
                )
            );
        } catch (err: any) {
            setError(
                err.response?.data?.detail ??
                "Failed to delete budget."
            );

            throw err;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBudgets();
    }, []);

    return {
        budgets,
        loading,
        error,
        fetchBudgets,
        addBudget,
        editBudget,
        removeBudget,
    };
}
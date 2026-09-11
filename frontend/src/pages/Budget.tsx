import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BudgetForm from "@/components/budget/BudgetForm";
import BudgetTable from "@/components/budget/BudgetTable";

import { useBudget } from "@/hooks/useBudget";

import type { Budget as BudgetType } from "@/types/budget";

export default function Budget() {
    const {
        budgets,
        loading,
        error,
        addBudget,
        editBudget,
        removeBudget,
    } = useBudget();

    const [editingBudget, setEditingBudget] =
        useState<BudgetType | null>(null);

    function handleEdit(budget: BudgetType) {
        setEditingBudget(budget);
    }

    function handleCancelEdit() {
        setEditingBudget(null);
    }

    async function handleEditBudget(
        id: number,
        data: BudgetType
    ) {
        await editBudget(id, data);
        setEditingBudget(null);
    }

    async function handleDeleteBudget(id: number) {
        await removeBudget(id);

        if (editingBudget?.id === id) {
            setEditingBudget(null);
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Budget
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Set and manage your monthly spending limit.
                    </p>
                </div>

                <BudgetForm
                    editingBudget={editingBudget}
                    onCancelEdit={handleCancelEdit}
                    onAdd={addBudget}
                    onEdit={handleEditBudget}
                    loading={loading}
                    error={error}
                />

                <BudgetTable
                    budgets={budgets}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteBudget}
                />
            </div>
        </DashboardLayout>
    );
}
import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BudgetForm from "@/components/budget/BudgetForm";
import BudgetTable from "@/components/budget/BudgetTable";

import { useBudget } from "@/hooks/useBudget";

import type { Budget as BudgetType } from "@/types/budget";

export default function Budget() {
    const {
        budget,
        loading,
        error,
        addBudget,
        editBudget,
    } = useBudget();

    const [editingBudget, setEditingBudget] =
        useState<BudgetType | null>(null);

    function handleEdit(budget: BudgetType) {
        setEditingBudget(budget);
    }

    function handleCancelEdit() {
        setEditingBudget(null);
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
                    onEdit={editBudget}
                    loading={loading}
                    error={error}
                />

                <BudgetTable
                    budget={budget}
                    loading={loading}
                    onEdit={handleEdit}
                />
            </div>
        </DashboardLayout>
    );
}
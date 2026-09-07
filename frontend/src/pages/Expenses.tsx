import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ExpenseForm from "@/components/expenses/ExpenseForm";

import { useExpenses } from "@/hooks/useExpenses";

import type { Expense } from "@/types/expense";

import ExpenseTable from "@/components/expenses/ExpenseTable";

export default function Expenses() {
    const {
        expenses,
        loading,
        error,
        addExpense,
        editExpense,
        removeExpense,
    } = useExpenses();

    const [selectedExpense, setSelectedExpense] =
        useState<Expense | null>(null);

    function handleEdit(expense: Expense) {
        setSelectedExpense(expense);
    }

    async function handleDelete(id: number) {
        await removeExpense(id);
    }

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Expenses
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Track and manage all your expenses.
                    </p>
                </div>

            </div>

            <ExpenseForm
                editingExpense={selectedExpense}
                onCancelEdit={() =>
                    setSelectedExpense(null)
                }
                onAdd={addExpense}
                onEdit={editExpense}
                loading={loading}
                error={error}
            />

            <ExpenseTable
                expenses={expenses}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </DashboardLayout>
    );
}
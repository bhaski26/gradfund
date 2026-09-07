import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import type { Expense } from "@/types/expense";
import { Button } from "@/components/ui/button";
import DeleteExpenseDialog from "./DeleteExpenseDialog";

interface ExpenseTableProps {
    expenses: Expense[];
    loading: boolean;
    onEdit: (expense: Expense) => void;
    onDelete: (id: number) => Promise<void>;
}

export default function ExpenseTable({
    expenses,
    loading,
    onEdit,
    onDelete,
}: ExpenseTableProps) {
    const [deleteId, setDeleteId] =
        useState<number | null>(null);

    async function handleConfirmDelete() {
        if (deleteId === null) {
            return;
        }

        await onDelete(deleteId);
        setDeleteId(null);
    }

    if (loading && expenses.length === 0) {
        return (
            <div className="rounded-xl border p-6 text-center text-slate-500">
                Loading expenses...
            </div>
        );
    }

    if (!loading && expenses.length === 0) {
        return (
            <div className="rounded-xl border p-6 text-center text-slate-500">
                No expenses found.
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="border-b bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">
                                Title
                            </th>

                            <th className="px-4 py-3 text-left font-semibold">
                                Category
                            </th>

                            <th className="px-4 py-3 text-left font-semibold">
                                Amount
                            </th>

                            <th className="px-4 py-3 text-left font-semibold">
                                Date
                            </th>

                            <th className="px-4 py-3 text-right font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((expense) => (
                            <tr
                                key={expense.id}
                                className="border-b last:border-0 hover:bg-slate-50"
                            >
                                <td className="px-4 py-3 font-medium">
                                    {expense.title}
                                </td>

                                <td className="px-4 py-3">
                                    {expense.category}
                                </td>

                                <td className="px-4 py-3">
                                    ₹
                                    {expense.amount.toLocaleString(
                                        "en-IN",
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    {expense.expense_date}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                onEdit(expense)
                                            }
                                        >
                                            <Pencil size={16} />
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() =>
                                                setDeleteId(
                                                    expense.id
                                                )
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteExpenseDialog
                open={deleteId !== null}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteId(null)}
                loading={loading}
            />
        </>
    );
}
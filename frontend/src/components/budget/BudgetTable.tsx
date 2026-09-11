import { Pencil, Trash2 } from "lucide-react";

import type { Budget } from "@/types/budget";
import { Button } from "@/components/ui/button";

interface BudgetTableProps {
    budgets: Budget[];
    loading: boolean;
    onEdit: (budget: Budget) => void;
    onDelete: (id: number) => Promise<void>;
}

export default function BudgetTable({
    budgets,
    loading,
    onEdit,
    onDelete,
}: BudgetTableProps) {
    if (loading && budgets.length === 0) {
        return (
            <div className="rounded-xl border p-6 text-center text-slate-500">
                Loading budgets...
            </div>
        );
    }

    if (!loading && budgets.length === 0) {
        return (
            <div className="rounded-xl border p-6 text-center text-slate-500">
                No budgets set yet.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
                <thead className="border-b bg-slate-50">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                            Month
                        </th>

                        <th className="px-4 py-3 text-left font-semibold">
                            Year
                        </th>

                        <th className="px-4 py-3 text-left font-semibold">
                            Monthly Limit
                        </th>

                        <th className="px-4 py-3 text-right font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {budgets.map((budget) => (
                        <tr
                            key={budget.id}
                            className="border-b last:border-b-0 hover:bg-slate-50"
                        >
                            <td className="px-4 py-3 font-medium">
                                {budget.month}
                            </td>

                            <td className="px-4 py-3">
                                {budget.year}
                            </td>

                            <td className="px-4 py-3">
                                ₹
                                {budget.monthly_limit.toLocaleString(
                                    "en-IN",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                )}
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            onEdit(budget)
                                        }
                                        title="Edit budget"
                                    >
                                        <Pencil size={16} />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            onDelete(budget.id)
                                        }
                                        title="Delete budget"
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
    );
}
import { Pencil } from "lucide-react";

import type { Budget } from "@/types/budget";
import { Button } from "@/components/ui/button";

interface BudgetTableProps {
    budget: Budget | null;
    loading: boolean;
    onEdit: (budget: Budget) => void;
}

export default function BudgetTable({
    budget,
    loading,
    onEdit,
}: BudgetTableProps) {
    if (loading && !budget) {
        return (
            <div className="rounded-xl border p-6 text-center text-slate-500">
                Loading budget...
            </div>
        );
    }

    if (!loading && !budget) {
        return (
            <div className="rounded-xl border p-6 text-center text-slate-500">
                No budget set yet.
            </div>
        );
    }

    if (!budget) {
        return null;
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
                    <tr className="hover:bg-slate-50">
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
                            <div className="flex justify-end">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onEdit(budget)}
                                >
                                    <Pencil size={16} />
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
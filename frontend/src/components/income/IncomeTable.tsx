import { Pencil, Trash2 } from "lucide-react";

import type { Income } from "@/types/income";

import { Button } from "@/components/ui/button";

interface IncomeTableProps {
    income: Income[];
    loading: boolean;
    onEdit: (income: Income) => void;
    onDelete: (id: number) => void;
}

export default function IncomeTable({
    income,
    loading,
    onEdit,
    onDelete,
}: IncomeTableProps) {
    if (loading) {
        return (
            <div className="rounded-2xl border bg-white p-8 text-center text-slate-500 shadow-sm">
                Loading income...
            </div>
        );
    }

    if (income.length === 0) {
        return (
            <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
                <div className="mb-4 text-5xl">💰</div>

                <h2 className="text-xl font-semibold">
                    No income records yet
                </h2>

                <p className="mt-2 text-slate-500">
                    Add your first income to start tracking your finances.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <table className="w-full">
                <thead className="border-b bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Source
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Month
                        </th>

                        <th className="px-6 py-4 text-right text-sm font-semibold">
                            Amount
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Year
                        </th>

                        <th className="px-6 py-4 text-center text-sm font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {income.map((item) => (
                        <tr
                            key={item.id}
                            className="border-b transition-colors hover:bg-slate-50"
                        >
                            <td className="px-6 py-4 font-medium">
                                {item.source}
                            </td>

                            <td className="px-6 py-4">
                                {item.month}
                            </td>

                            <td className="px-6 py-4 text-right font-semibold text-green-600">
                                {item.amount.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                })}
                            </td>

                            <td className="px-6 py-4">
                                {new Date(item.year).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => onEdit(item)}
                                    >
                                        <Pencil size={16} />
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() =>
                                            onDelete(item.id)
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
    );
}
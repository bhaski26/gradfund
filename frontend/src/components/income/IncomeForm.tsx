import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    incomeSchema,
    type IncomeFormData,
} from "@/schemas/incomeSchema";

import { useIncome } from "@/hooks/useIncome";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IncomeForm() {
    const {
        addIncome,
        loading,
        error,
    } = useIncome();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IncomeFormData>({
        resolver: zodResolver(incomeSchema),

        defaultValues: {
            source: "",
            amount: 0,
            month: "",
            year: new Date().getFullYear(),
        },
    });

    async function onSubmit(data: IncomeFormData) {
        await addIncome(data);
        reset({
            source: "",
            amount: 0,
            month: "",
            year: new Date().getFullYear(),
        });
    }

    return (
        <div className="rounded-3xl border bg-white p-8 shadow-xl">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold">
                    Add Income
                </h2>

                <p className="mt-2 text-slate-500">
                    Record your monthly income.
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Source */}
                <div>
                    <Label htmlFor="source">
                        Income Source
                    </Label>

                    <Input
                        id="source"
                        placeholder="Salary"
                        className="mt-2 h-11"
                        {...register("source")}
                    />

                    {errors.source && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.source.message}
                        </p>
                    )}
                </div>

                {/* Amount */}
                <div>
                    <Label htmlFor="amount">
                        Amount
                    </Label>

                    <Input
                        id="amount"
                        type="number"
                        placeholder="50000"
                        className="mt-2 h-11"
                        {...register("amount", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.amount && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.amount.message}
                        </p>
                    )}
                </div>

                {/* Month */}
                <div>
                    <Label htmlFor="month">
                        Month
                    </Label>

                    <select
                        id="month"
                        className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3"
                        {...register("month")}
                    >
                        <option value="">
                            Select Month
                        </option>

                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>

                    {errors.month && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.month.message}
                        </p>
                    )}
                </div>

                {/* Year */}
                <div>
                    <Label htmlFor="year">
                        Year
                    </Label>

                    <Input
                        id="year"
                        type="number"
                        className="mt-2 h-11"
                        {...register("year", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.year && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.year.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={loading}
                >
                    {loading
                        ? "Saving Income..."
                        : "Add Income"}
                </Button>
            </form>
        </div>
    );
}
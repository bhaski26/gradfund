interface BudgetProgressProps {

    monthlyLimit: number;

    remainingBudget: number;

    usagePercentage: number;

}

export default function BudgetProgress({

    monthlyLimit,

    remainingBudget,

    usagePercentage,

}: BudgetProgressProps) {

    return (

        <div
        className="
        rounded-3xl
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
    "
>

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold">

                        Monthly Budget

                    </h2>

                    <p className="mt-1 text-slate-500">

                        ₹{remainingBudget.toLocaleString()} remaining

                    </p>

                </div>

                <div className="text-right">

                    <p className="text-sm text-slate-500">

                        Limit

                    </p>

                    <p className="font-semibold">

                        ₹{monthlyLimit.toLocaleString()}

                    </p>

                </div>

            </div>

            <div className="mt-8">

                <div className="h-4 overflow-hidden rounded-full bg-slate-200">

                    <div

                        className="h-full rounded-full bg-green-500 transition-all duration-700"

                        style={{

                            width: `${usagePercentage}%`,

                        }}

                    />

                </div>

            </div>

            <div className="mt-4 flex justify-between text-sm">

                <span>

                    Used

                </span>

                <span className="font-bold">

                    {usagePercentage.toFixed(1)}%

                </span>

            </div>

        </div>

    );

}
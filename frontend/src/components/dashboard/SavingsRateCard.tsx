interface SavingsRateCardProps {

    savingsRate: number;

    financialStatus: string;

}

export default function SavingsRateCard({

    savingsRate,

    financialStatus,

}: SavingsRateCardProps) {

    return (

        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="text-xl font-bold">

                Savings Rate

            </h2>

            <p className="mt-2 text-slate-500">

                Excellent saving habits lead to long-term wealth.

            </p>

            <div className="mt-8">

                <div className="h-4 overflow-hidden rounded-full bg-slate-200">

                    <div
                        className="
                            h-full
                            rounded-full
                            bg-blue-500
                            transition-all
                            duration-700
                        "
                        style={{
                            width: `${Math.min(savingsRate, 100)}%`,
                        }}
                    />

                </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

                <span className="text-slate-500">

                    Savings Rate

                </span>

                <span className="text-xl font-bold">

                    {savingsRate.toFixed(2)}%

                </span>

            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 p-4">

                <p className="text-sm text-slate-600">

                    Status

                </p>

                <p className="mt-1 font-semibold">

                    {financialStatus}

                </p>

            </div>

        </div>

    );

}
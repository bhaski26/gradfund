interface DashboardHeaderProps {

    financialStatus: string;

    savingsRate: number;

}

export default function DashboardHeader({

    financialStatus,

    savingsRate,

}: DashboardHeaderProps) {

    return (

        <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-10 text-white shadow-xl">

            <p className="text-sm uppercase tracking-widest text-slate-300">

                Welcome Back 👋

            </p>

            <h1 className="mt-2 text-4xl font-bold">

                {financialStatus}

            </h1>

            <p className="mt-4 text-lg text-slate-200">

                You're saving

                <span className="font-bold">

                    {" "}
                    {savingsRate.toFixed(2)}%

                </span>

                {" "}of your income this month.

            </p>

        </div>

    );

}
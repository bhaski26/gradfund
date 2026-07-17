interface DashboardHeaderProps {

    financialStatus: string;

    savingsRate: number;

}

export default function DashboardHeader({

    financialStatus,

    savingsRate,

}: DashboardHeaderProps) {

    return (

            <div
                className="
                    rounded-3xl
                    bg-gradient-to-r
                    from-slate-900
                    to-slate-800
                    px-10
                    py-8
                    mb-6
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:scale-[1.01]
                    hover:shadow-2xl
                "
            >

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
interface AIInsightCardProps {

    message: string;

}

export default function AIInsightCard({

    message,

}: AIInsightCardProps) {

    return (

            <div
                className="
                rounded-3xl
                bg-gradient-to-br
                from-slate-900
                via-slate-800
                to-slate-700
                p-8
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
            "
            >

            <div className="flex items-center gap-3">

                <div className="text-3xl">

                    🤖

                </div>

                <div>

                    <h2 className="text-2xl font-bold">

                        GradFund AI

                    </h2>

                    <p className="text-indigo-100">

                        Personalized Financial Insight

                    </p>

                </div>

            </div>

            <p className="mt-8 text-lg leading-8">

                {message}

            </p>

            <button
                className="
                    mt-8
                    rounded-xl
                    bg-white/20
                    px-5
                    py-3
                    font-medium
                    backdrop-blur
                    transition
                    hover:bg-white/30
                "
            >
                View Full Analysis →
            </button>

        </div>


    );

}
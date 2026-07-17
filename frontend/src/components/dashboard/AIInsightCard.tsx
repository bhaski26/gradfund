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
                bg-gradient-to-r
                from-indigo-600
                to-blue-600
                p-8
                text-white
                shadow-lg
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

        </div>

    );

}
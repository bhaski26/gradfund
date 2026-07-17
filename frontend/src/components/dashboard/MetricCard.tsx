import type { ReactNode } from "react";

interface MetricCardProps {
    title: string;
    value: string;
    icon: ReactNode;

    iconBgClass?: string;
    iconColorClass?: string;
}

export default function MetricCard({
    title,
    value,
    icon,

    iconBgClass = "bg-slate-100",
    iconColorClass = "text-slate-900",

}: MetricCardProps) {

    return (

        <div
            className="
            rounded-3xl
            bg-white
            p-7
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
        "
        >

            <div
                className={`
                    mb-5
                    inline-flex
                    rounded-2xl
                    p-4
                    ${iconBgClass}
                `}
            >
                <div className={iconColorClass}>
                    {icon}
                </div>
            </div>

            <p
                className="
                text-sm
                font-medium
                text-slate-500
            "
            >

                {title}

            </p>

            <h2
                className="
                mt-3
                text-4xl
                font-bold
            "
            >

                {value}

            </h2>

        </div>

    );

}
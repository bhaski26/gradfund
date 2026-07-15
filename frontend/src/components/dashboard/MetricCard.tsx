import type { ReactNode } from "react";

interface MetricCardProps {

    title: string;

    value: string;

    icon: ReactNode;

}

export default function MetricCard({

    title,

    value,

    icon,

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
                className="
                mb-5
                inline-flex
                rounded-2xl
                bg-slate-100
                p-4
            "
            >

                {icon}

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
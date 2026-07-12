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

        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-4">

                {icon}

            </div>

            <h3 className="text-slate-500">

                {title}

            </h3>

            <p className="mt-2 text-3xl font-bold">

                {value}

            </p>

        </div>

    );

}
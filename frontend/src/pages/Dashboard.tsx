import DashboardLayout from "@/components/layout/DashboardLayout";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricCard from "@/components/dashboard/MetricCard";

import {
    Wallet,
    Receipt,
    PiggyBank,
    HeartPulse,
} from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

export default function Dashboard() {

    const {

        data,

        loading,

        error,

    } = useDashboard();

    if (loading) {

        return (

            <DashboardLayout>

                <p>Loading dashboard...</p>

            </DashboardLayout>

        );

    }

    if (error || !data) {

        return (

            <DashboardLayout>

                <p>{error}</p>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <DashboardHeader

            financialStatus={
            data.financial_status
            }

            savingsRate={
                data.savings_rate
            }
            
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <MetricCard

                    title="Income"

                    value={`₹${data.total_income}`}

                    icon={<Wallet size={28} />}

                />

                <MetricCard

                    title="Expenses"

                    value={`₹${data.total_expenses}`}

                    icon={<Receipt size={28} />}

                />

                <MetricCard

                    title="Savings"

                    value={`₹${data.net_savings}`}

                    icon={<PiggyBank size={28} />}

                />

                <MetricCard

                    title="Health Score"

                    value={`${data.health_score}`}

                    icon={<HeartPulse size={28} />}

                />

            </div>

        </DashboardLayout>

    );

}
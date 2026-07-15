import api from "./api";

export interface DashboardData {

    monthly_limit: number;

    total_income: number;

    total_expenses: number;

    remaining_budget: number;

    net_savings: number;

    savings_rate: number;

    usage_percentage: number;

    health_score: number;

    financial_status: string;

    budget_status: string;

    message: string;

}

export async function getDashboard() {

    const response =
        await api.get<DashboardData>(
            "/dashboard"
        );

    return response.data;

}
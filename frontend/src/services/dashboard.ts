import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export interface DashboardData {

    total_income: number;

    total_expenses: number;

    net_savings: number;

    health_score: number;

    budget_status: string;

}

export async function getDashboard() {

    const response = await API.get<DashboardData>(
        "/dashboard"
    );

    return response.data;

}
import type {
    Budget,
    CreateBudgetRequest,
    UpdateBudgetRequest,
} from "@/types/budget";

import api from "./api";

export async function getBudgets(): Promise<Budget[]> {
    const response = await api.get("/budget/");
    return response.data;
}

export async function createBudget(
    data: CreateBudgetRequest
): Promise<Budget> {
    const response = await api.post("/budget/", data);
    return response.data;
}

export async function updateBudget(
    id: number,
    data: UpdateBudgetRequest
): Promise<Budget> {
    const response = await api.put(`/budget/${id}`, data);
    return response.data;
}

export async function deleteBudget(
    id: number
): Promise<void> {
    await api.delete(`/budget/${id}`);
}
import type {
    Expense,
    CreateExpenseRequest,
    UpdateExpenseRequest,
} from "@/types/expense";

import api from "./api";

export async function getExpenses(): Promise<Expense[]> {
    const response = await api.get("/expenses");
    return response.data;
}

export async function createExpense(
    data: CreateExpenseRequest
): Promise<Expense> {
    const response = await api.post("/expenses", data);
    return response.data;
}

export async function updateExpense(
    id: number,
    data: UpdateExpenseRequest
): Promise<Expense> {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
}

export async function deleteExpense(
    id: number
): Promise<void> {
    await api.delete(`/expenses/${id}`);
}
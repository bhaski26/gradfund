import type {
    Income,
    CreateIncomeRequest,
    UpdateIncomeRequest,
} from "@/types/income";
import api from "./api";


export async function getIncome(): Promise<Income[]> {
    const response = await api.get("/income");
    return response.data;
}

export async function createIncome(
    data: CreateIncomeRequest
): Promise<Income> {
    const response = await api.post("/income", data);
    return response.data;
}

export async function updateIncome(
    id: number,
    data: UpdateIncomeRequest
): Promise<Income> {
    const response = await api.put(`/income/${id}`, data);
    return response.data;
}

export async function deleteIncome(
    id: number
): Promise<void> {
    await api.delete(`/income/${id}`);
}
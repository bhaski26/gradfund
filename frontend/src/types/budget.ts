export interface Budget {
    id: number;
    monthly_limit: number;
    month: string;
    year: number;
}

export interface CreateBudgetRequest {
    monthly_limit: number;
    month: string;
    year: number;
}

export interface UpdateBudgetRequest {
    monthly_limit: number;
    month: string;
    year: number;
}
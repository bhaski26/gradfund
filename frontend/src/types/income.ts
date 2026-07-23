export interface Income {
    id: number;
    source: string;
    amount: number;
    month: string;
    year: number;
}

export interface CreateIncomeRequest {
    source: string;
    amount: number;
    month: string;
    year: number;
}

export interface UpdateIncomeRequest {
    source: string;
    amount: number;
    month: string;
    year: number;
}
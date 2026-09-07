export interface Expense {
    id: number;
    title: string;
    amount: number;
    category: string;
    expense_date: string;
}

export interface CreateExpenseRequest {
    title: string;
    amount: number;
    category: string;
    expense_date: string;
}

export interface UpdateExpenseRequest {
    title: string;
    amount: number;
    category: string;
    expense_date: string;
}
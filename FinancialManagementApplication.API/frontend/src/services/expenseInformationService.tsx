import type {ExpenseInformationDTO, CreateExpenseInformationDTO} from "../types"

const API_URL = "https://localhost:7094/api/expenseInformation";

export async function getExpensesInformationByAccountID(accountID:string) : Promise<ExpenseInformationDTO[]>{
    const response = await fetch(`${API_URL}/account/${accountID}`);

    if (!response.ok)
        throw new Error("Failed to fetch expenses");
    return response.json();
}

export async function getExpensesByCategoryID(categoryID: string ) : Promise<ExpenseInformationDTO[]>{
    const response = await fetch(`${API_URL}/category/${categoryID}`);

    if (!response.ok)
        throw new Error("Failed to fetch expenses");
    return response.json();
}

export async function getExpenseByID(expenseID: string) : Promise<ExpenseInformationDTO>{
    const response = await fetch(`${API_URL}/${expenseID}`);

    if (!response.ok)
        throw new Error("Failed to fetch expenses");
    return response.json();
}


export async function createExpense(expense: CreateExpenseInformationDTO) : Promise<ExpenseInformationDTO>{
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });

    if(!response.ok){
        throw new Error("Failed to create expense");
    }

    return response.json();
}

export async function updateCategory(expenseID: string, expense: CreateExpenseInformationDTO) : Promise<ExpenseInformationDTO>{
    const response = await fetch(`${API_URL}/${expenseID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });

    if (!response.ok)
    {
        throw new Error("Failed to update expense");
    }
    return response.json();
}

export async function deleteExpenseInformation(expenseID: string) : Promise<void>{
    const response = await fetch(`${API_URL}/${expenseID}`,{
        method: "DELETE",
    });

    if(!response.ok){
        throw new Error("Failed to delete expense");
    }
}

export interface ExpenseCategoryDTO{
    CategoryID: string,
    Name: string,
    Description: string,
    AccountID: string,
    CreateAt: string,
    UpdateAt: string
}

export interface CreateExpenseCategoryDTO{
    Name: string,
    Description: string,
    AccountID: string
}

export interface UpdateExpenseCategoryDTO{
    Name: string,
    Description: string
}

export interface ExpenseInformationDTO{
    ExpenseID: string, 
    Name: string, 
    Amount: string, 
    CategoryID: string, 
    AllocatedPercentage: string, 
    AccountID: string, 
    CreateAt: string, 
    UpdateAt: string
}

export interface CreateExpenseInformationDTO{
    Name: string, 
    Amount: string, 
    CategoryID: string, 
    AllocatedPercentage: string, 
    AccountID: string
}

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
    Amount: number, 
    CategoryID: string, 
    AllocatedPercentage: string, 
    AccountID: string, 
    CreateAt: string, 
    UpdateAt: string
}

export interface CreateExpenseInformationDTO{
    Name: string, 
    Amount: number, 
    CategoryID: string, 
    AllocatedPercentage: number, 
    AccountID: string
}

export interface UserDTO{
        Id: string
        FirstName: string
        LastName : string
        PhoneNumber : string
        DateOfBirth : string
        AccountID : string
        CreateAt : string
        UpdateAt : string
}

export interface UpdateUserDTO {
    FirstName: string
    LastName : string
    PhoneNumber : string
    DateOfBirth : string
}

export interface CreateUserDTO {
    FirstName: string
    LastName : string
    PhoneNumber : string
    DateOfBirth : string
    AccountID : string
}
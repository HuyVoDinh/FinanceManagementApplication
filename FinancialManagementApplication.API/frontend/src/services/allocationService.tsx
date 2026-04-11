const API_URL = "https://localhost:7094/api/allocation";

export async function calculateAllocation(totalIncome: number, accountID: string) : Promise<Record<string, number>>{
    const response = await fetch(`${API_URL}/calculate?totalIncome=${totalIncome}&accoountID${accountID}`);

    if (!response.ok){
        throw new Error("Failed to calculate allocation");
    }
    return response.json();
}

export async function adjustAllocations (totalIncome: number, reductionAmount: number, accountID: string) : Promise<Record<string,number>> {
    const response = await fetch(`${API_URL}/adjust?totalIncome=${totalIncome}&reductionAmount=${reductionAmount}&accountID=${accountID}`)

    if (!response.ok)
    {
        throw new Error("Failed to adjust allocation")
    }
    return response.json();
}
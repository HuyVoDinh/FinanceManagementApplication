import { useState, useEffect } from "react";
import type { ExpenseCategoryDTO, ExpenseInformationDTO, CreateExpenseInformationDTO } from "./types";
import * as expenseCategoryService from "./services/expenseCategoryService"
import * as expenseInformationService from "./services/expenseInformationService"
import * as allocationService from "./services/allocationService"

interface ExpenseManagementProps{
    accountID: string;
}

export default function ExpenseManagement({accountID} : ExpenseManagementProps) {
    const [expenseCategories, setExpenseCategories] = useState<ExpenseCategoryDTO[]>([]);
    const [expenseInformations, setExpenseInformations] = useState<ExpenseInformationDTO[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [reductionAmount, setReductionAmount] = useState(0);
    const [allocations, setAllocations] = useState<Record<string,number>>({});
    const [adjustAllocations, setAdjustedAllocations] = useState<Record<string,number>>({});
    const [newExpense, setNewExpense] = useState({
        name: "",
        amount: 0,
        categoryID: "",
        allocatedPercentage: 0,
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        loadCategories();
        loadExpenses();
    });

    const loadCategories = async () =>{
        try {
            const data = await expenseCategoryService.getExpenseCategoriesByAccountID(accountID);
            setExpenseCategories(data);

            // Set default category for new expense
            if(data.length > 0 && !newExpense.categoryID){
                setNewExpense({...newExpense, categoryID: data[0].CategoryID});
            }
        }
        catch (error){
            console.error("Failed to load categories: ", error);
        }
    };

    const loadExpenses = async () => {
        try {
            const data = await expenseInformationService.getExpensesByCategoryID(accountID);
            setExpenseInformations(data);
        }
        catch (error)
        {
            console.error("Failed to load expenses: ", error);
        }
    };

    const handleCalculateAllocations = async () => {
        try {
            const calculatedAllocations = await allocationService.calculateAllocation(totalIncome, accountID);
            setAdjustedAllocations(calculatedAllocations);
        }
        catch (error)
        {
            console.error("Failed to calculate allocations: ", error);
        }
    };

    const handleAdjustAllocations = async () => {
        try {
            const adjusted = await allocationService.adjustAllocations(totalIncome, reductionAmount, accountID);
            setAdjustedAllocations(adjusted);
        }
        catch (error)
        {
            console.error("Failed to adjust allocations: ", error);
        }
    };

    const handleAddExpense = async () => {
        if (!newExpense.name || newExpense.amount <= 0 || !newExpense.categoryID){
            alert("Please fill in all fields with valid values");
            return;
        }

        try{
            const createExpenseDTO : CreateExpenseInformationDTO = {
                Name: newExpense.name,
                Amount: newExpense.amount,
                CategoryID: newExpense.categoryID,
                AllocatedPercentage: newExpense.allocatedPercentage,
                AccountID: accountID,
                
            };

            const createExpense = await expenseInformationService.createExpense(createExpenseDTO);
            setExpenseInformations([...expenseInformations, createExpense]);
            setNewExpense({
                name: "",
                amount: 0,
                allocatedPercentage: 0,
                categoryID: newExpense.categoryID,
                date: new Date().toISOString().split("T")[0],
            });
        } catch (error){
            console.error("Failed to create expense: ", error);
            alert("Failed to create expense");
        }
    };

    const handleDeleteExpense = async (expenseID: string) => {
        if(!window.confirm("Are you sure you want to delete this expense?")){
            return;
        }

        try {
            await expenseInformationService.deleteExpenseInformation(expenseID);
            setExpenseInformations(expenseInformations.filter((exp) => exp.ExpenseID !== expenseID));
        }
        catch (error) {
            console.error("Failed to delete expense: ", error);
            alert("Failed to delete expense");
        }
    };
    
    const totalExpense = expenseInformations.reduce((sum,exp) => sum + exp.Amount, 0);
    const remainingAmount = totalIncome - totalExpense - reductionAmount;

    return(
        <div className="expense-management">
            <h2>Expense Management</h2>
            <div className="income-section">
                <h3>Income Information</h3>
                <div className="form-group">
                    <label>
                        Total Monthly Income: $
                        <input type="number" value={totalIncome} onChange={(e)=>setTotalIncome(Number(e.currentTarget.value))}
                            min="0" step = "100"
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Reduction Amount (if any): $
                        <input type="number" value={reductionAmount} onChange={(e) => setReductionAmount(Number(e.currentTarget.value))}
                            min="0" step="100"
                        />
                    </label>
                </div>

                <div className="allocations-section">
                    <h3>Category Allocation</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Percentage</th>
                                <th>Original Allocation</th>
                                {reductionAmount > 0 && <th>Adjusted Allocation</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {expenseCategories.map((category) => (
                                <tr key={category.CategoryID}>
                                    <td>{category.Name}</td>
                                    <td>${allocations[category.CategoryID]?.toFixed(2) || "0.00"}</td>
                                    {reductionAmount > 0 && (
                                        <td>${adjustAllocations[category.CategoryID]?.toFixed(2) || "0.00"}</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="expense-summary">
                    <h3>Expense Summary</h3>
                    <p>Total Expenses: ${totalExpense.toFixed(2)}</p>
                    <p>Remaining Amount: ${remainingAmount.toFixed(2)}</p>
                    {remainingAmount < 0 && (
                        <p className="error">Warning: you are over budget by ${Math.abs(remainingAmount).toFixed(2)}</p>
                    )}
                </div>

                <div className="expense-form">
                    <h3>Add new Expense</h3>
                    <div className="form-group">
                        <input type="text" placeholder="Expense Name" value={newExpense.name}
                            onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <input type="number" placeholder="Amount" value={newExpense.amount}
                            onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="form-group">
                        <select value={newExpense.categoryID} onChange={(e) =>
                            setNewExpense({...newExpense, categoryID: e.target.value})
                        }>
                            {expenseCategories.map((category) => (
                                <option key={category.CategoryID} value={category.CategoryID}>category.name</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="date" value={newExpense.date} onChange={(e)=>
                            setNewExpense({...newExpense, date:e.target.value})}/>
                    </div>
                    <button onClick={handleAddExpense}>Add Expense</button>
                </div>

                <div className="expenses-list">
                    <h3>Expense List</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseInformations.map((expense) => {
                                const category = expenseCategories.find(
                                    (cat) => cat.CategoryID === expense.CategoryID
                                );
                                return (
                                    <tr key={expense.ExpenseID}>
                                        <td>{new Date(expense.CreateAt).toLocaleDateString()}</td>
                                        <td>{expense.Name}</td>
                                        <td>{category?.Name || "Unknow"}</td>
                                        <td>${expense.Amount.toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleDeleteExpense(expense.ExpenseID)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
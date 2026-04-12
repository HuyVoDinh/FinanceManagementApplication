import { useState, useEffect } from "react";
import { ExpenseCategoryDTO, CreateExpenseCategoryDTO, UpdateExpenseCategoryDTO } from './types';
import * as expenseCategoryService from "./services/expenseCategoryService"

interface IncomeSetupProps{
    accountID: string;
}

export default function IncomeSetup({ accountID} : IncomeSetupProps){
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [newExpenseCategory, setNewExpenseCategory] = useState({
        name: "",
        description: "",
        allocationPercentage: 0
    });
    const [editingExpenseCategoryID, setEditingExpenseCategoryID] = useState<string | null>(null);
    const [editExpenseCategory, setEditExpenseCategory] = useState({
        name: "",
        description: "",
        allocationPercentage: 0
    });

    useEffect(() => {
        loadExpenseCategories();
    }, [accountID]);

    const loadExpenseCategories = async() => {
        try {
            const data = await expenseCategoryService.getExpenseCategoriesByAccountID(accountID);
            setExpenseCategories(data);
        } 
        catch (error){
            console.error("Failed to load categories: ", error);
        }
    };

    const handleAddCategory = async () => {
        if (!newExpenseCategory.name || newExpenseCategory.allocationPercentage <= 0){
            alert("Please fill in all fields with valid values");
            return;
        }

        const totalPercentage = expenseCategories.reduce(
            (sum, cat) => sum + cat.allocationPercentage,
            newExpenseCategory.allocationPercentage
        );
        
        if (totalPercentage > 100) {
            alert("Total allocation percentage cannot exceed 100%");
            return;
        }

        try {
            const createDTO : CreateExpenseCategoryDTO = {
                Name: newExpenseCategory.name,
                Description: newExpenseCategory.description,
                AllocationPercentage: newExpenseCategory.allocationPercentage,
                AccountID: accountID
            };

            const createdCategory = await expenseCategoryService.createCategory(createDTO);
            setExpenseCategories([...expenseCategories, createdCategory]);
            setNewExpenseCategory({
                name: "",
                description: "",
                allocationpercentage: 0,
            });
        }
        catch (error) {
            console.error("Failed to create category: ", error);
            alert("Failed to create category");
        }
    };

    const handleEditExpenseCategory = (category: ExpenseCategoryDTO) => {
        setEditingExpenseCategoryID(category.CategoryID);
        setEditExpenseCategory({
            name: category.Name,
            description: category.Description,
            allocationPercentage: category.allocationPercentage,
        });
    };

    const handleUPdateCategory = async () => {
        if (!editingExpenseCategoryID) return;

        // Calculate total percentage excluding the category being edited
        const totalPercentage = expenseCategories.reduce((sum, cat) => {
            if (cat.categoryID === editingExpenseCategoryID) 
                return sum;
            return sum + cat.allocationpercentage;
        }, editExpenseCategory.allocationPercentage);

        if (totalPercentage > 100) {
            alert ("Total allocation percentage cannot exceed 100%");
            return;
        }

        try {
            const updatedCategory = await expenseCategoryService.UpdateExpenseCategoryDTO(
                editingExpenseCategoryID,
                editExpenseCategory
            );

            setExpenseCategories(
                expenseCategories.map((cat) =>
                    cat.categoryID === editingExpenseCategoryID ? updatedCategory : cat
                )
            );
            setEditingExpenseCategoryID(null);
        }
        catch (error) {
            console.error("Failed to update category: ", error);
            alert("Failed to update category");
        }
    };

    const handleDeleteCategory = async (categoryID: string) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }

        try {
            await expenseCategoryService.deleteExpenseCategory(categoryID);
            setExpenseCategories(expenseCategories.filter((cat) => cat.categoryID !== categoryID));
        }
        catch (error)
        {
            console.error("Failed to delete category: " ,error);
            alert("Failed to delete category");
        }
    };

    const totalPercentage = expenseCategories.reduce(
        (sum, cat) => sum + cat.allocationpercentage,
    );

    return (
        <div className="income-setup">
            <h2>Income Setup</h2>

            <div className="income-input">
                <label>Total Monthly Income: $
                    <input type="number" value = {totalIncome} onChange = {(e) => setTotalIncome(Number(e.target.value))}
                        min = "0" step = "100"
                    />
                </label>
            </div>
            <div className="category-form">
                <h3>Add New Category</h3>
                <div className="form-group">
                    <input type="text" placeholder="Category.Name" value={newExpenseCategory.name}
                        onChange={(e) => setNewExpenseCategory({...newExpenseCategory, name: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Description" value={newExpenseCategory.description}
                        onChange={(e) => setNewExpenseCategory({...newExpenseCategory, description: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Allocation Percentage" value = {newExpenseCategory.allocationPercentage}
                        onChange={(e) => setNewExpenseCategory({...newExpenseCategory, allocationPercentage: Number(e.target.value),
                        })}
                    min="0"
                    max="100"
                    />
                    %
                </div>
                <button onClick={handleAddCategory}>Add Category</button>
            </div>

            <div className="categories-summary">
                <h3>Categories Allocation</h3>
                <p>Total Allocation: {totalPercentage.toFixed(2)}%</p>
                {totalPercentage > 100 && (
                    <p className="error">Warning: Total exceeds 100%</p>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Percentage</th>
                            <th>Allocated Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseCategories.map((category) => (
                            <tr key={category.categoryID}>
                                {editExpenseCategoryID === category.categoryID? (
                                    <>
                                        <td>
                                            <input type="text" value={editExpenseCategory.name} onChange={(e) => setEditExpenseCategory({...editExpenseCategory, name: e.target.value,})}/>
                                        </td>
                                        <td>
                                            <input type="text" value={editExpenseCategory.description} onChange={(e) => setEditExpenseCategory({...editExpenseCategory, description: e.target.value})}/>
                                        </td>
                                        <td>
                                            <input type="number" value={editExpenseCategory.allocationPercentage} onChange={(e) => setEditExpenseCategory({...editExpenseCategory, allocationPercentage: Nunber(e.target.value),})}
                                            min="0"
                                            max="100"
                                            />
                                            %
                                        </td>
                                        <td>
                                            ${((totalIncome * editExpenseCategory.allocationPercentage) / 100).toFixed(2)}
                                        </td>
                                        <td>
                                            <button onClick={handleUPdateCategory}>Save</button>
                                           <button onClick={() => setEditingExpenseCategoryID(null)}>Cancel</button> 
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>{category.allocationPercentage}%</td>
                                        <td>${((totalIncome * category.allocationPercentage)/100).toFixed(2)}</td>
                                        <td><button onClick={() => handleEditExpenseCategory(category)}>Edit</button></td>
                                        <td><button onClick={() => handleDeleteCategory(category.categoryID)}>Delete</button></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
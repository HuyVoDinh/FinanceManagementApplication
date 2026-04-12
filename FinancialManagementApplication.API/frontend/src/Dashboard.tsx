import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import IncomeSetup from "./IncomeSetup";
import ExpenseManagement from "./ExpenseManagement";
import UserProfile from "./UserProfile";

export default function Dashboard (){
    const [activeTab, setActiveTab] = useState("setup");
    const [accountID, setAccountID] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token){
            navigate("/login");
        }

        // TODO: decode the JWT to get the account ID -> use a placeholder
        setAccountID("00000000-0000-0000-0000-000000000001");
    }, [navigate]);
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Personal Finance Management</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>  

            <nav>
                <button className={activeTab === "setup" ? "active" : ""} onClick={() => setActiveTab("setup")}>Income Setup</button>
                <button className={activeTab === "expenses" ? "active" : ""} onClick={() => setActiveTab("expenses")}>Expense Managemet</button>
                <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</button>
            </nav>

            <main>
                {activeTab === "setup" && accountID && ( <IncomeSetup accountID={accountID}/>)}
                {activeTab === "expenses" && accountID && ( <ExpenseManagement accountID={accountID}/>)}
                {activeTab === "profile" && accountID && ( <UserProfile accountID={accountID} onProfileUpdate={() => console.log("Profile updated")}/>)}
            </main>
        </div>  
    );
}
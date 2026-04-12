import type { UserDTO, CreateUserDTO, UpdateUserDTO } from "../types";
const API_URL = "https://localhost:7094/api/user";

export async function getUserByAccountID(accountID: string) : Promise<UserDTO>{
    const response = await fetch(`${API_URL}/account/${accountID}`);

    if(!response.ok){
        throw new Error ("Failed to fetch user");
    }
    return response.json();
}

export async function getUserByID(userID: string) : Promise<UserDTO> {
    const response = await fetch (`${API_URL}/${userID}`);

    if(!response.ok){
        throw new Error ("Failed to fetch user");
    }
    return response.json(); 
}

export async function createUser(user: CreateUserDTO) : Promise<UserDTO>{
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response){
        throw new Error("Failed to create new user");
    }
    return response.json();
}

export async function updateUser(userID: string, user: UpdateUserDTO) : Promise<UserDTO>{
    const response = await fetch(`${API_URL}/${userID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(user)
    });

    if (!response.ok)
    {
        throw new Error("Failed to update user");
    }
    return response.json();
}

export async function deleteUser(UserID: string) : Promise<void>{
    const response = await fetch(`${API_URL}/${UserID}`,{
        method: "DELETE",
    });

    if(!response.ok){
        throw new Error("Failed to delete user");
    }
}
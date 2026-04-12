import { useState, useEffect } from "react";
import type { UserDTO, UpdateUserDTO } from './types';
import * as userService from "./services/userService"

interface UserProfileProps{
    accountID: string,
    onProfileUpdate: () => void;
}

export default function UserProfile({accountID, onProfileUpdate}: UserProfileProps){
    const [user, setUser] = useState<UserDTO | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        DOF: "",
    });

    useEffect(() => {loadUserProfile();}, [accountID]);

    const loadUserProfile = async () => {
        try {
            setLoading(true);
            const userData = await userService.getUserByAccountID(accountID);
            setUser(userData);

            setFormData({
                firstName: userData.FirstName || "",
                lastName: userData.LastName || "",
                phoneNumber: userData.PhoneNumber || "",
                DOF: userData.DateOfBirth ? new Date(userData.DateOfBirth).toISOString().split('T')[0] : "",
            });
        }
        catch (error){
            setError("Failed to load user profile");
            console.error("Error loading user profile: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        try{
            const updateDTO: UpdateUserDTO = {
                FirstName: formData.firstName,
                LastName: formData.lastName,
                DateOfBirth: formData.DOF,
                PhoneNumber: formData.phoneNumber
            };

            await userService.updateUser(user.Id, updateDTO);
            await loadUserProfile(); // Reload the updated userdata
            setIsEditing(false);
            onProfileUpdate(); // Notify parent component
        } catch (error){
            setError("Failed to update profile");
            console.error("Error updateing profile: ", error);
        }
    };

    if (loading) {
        return <div>Loading user profile...</div>
    }

    if (error) {
        return <div className="error">Error: {error}</div>
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>

            {!isEditing ? (
                <div className="profile-view">
                    <div className="profile-field">
                        <label>Name:</label>
                        <span>{user?.FirstName} {user?.LastName}</span>
                    </div>
                    <div className="profile-field">
                        <label>Phone:</label>
                        <span>{user?.PhoneNumber}</span>
                    </div>
                    <div className="profile-field">
                        <label>DOF:</label>
                        <span>{user?.DateOfBirth && user.DateOfBirth != "0001-01-01T00:00:00" ? new Date(user.DateOfBirth).toISOString() : "Not provided"}</span>
                    </div>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="profile-edit">
                    <div className="form-group">
                        <label>First name:</label>
                        <input type="text" name="firstname" value={formData.firstName} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Last name:</label>
                        <input type="text" name="lastname" value={formData.lastName} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>DOF:</label>
                        <input type="date" name="dof" value={formData.DOF} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}/>
                    </div>

                    <div className="form-action">
                        <button type="submit">Save changes</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            )};
        </div>
    );
}
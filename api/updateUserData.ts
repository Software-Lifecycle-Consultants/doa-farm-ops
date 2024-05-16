import { User } from "@/redux/types";

// Define the structure of the response data
interface UserDataResponse {
    user: User;
}

/**
 * Function to update user data based on user ID from the backend server.
 * @param userData The user data to be updated.
 * @returns A promise that resolves with the updated user data if successful, or rejects with an error.
 */
export async function updateUserData(userData: User): Promise<UserDataResponse> {

    try{
          const apiEndpoint = `http://localhost:5000/api/user/updateUser/${userData._id}`; // Extract _id specifically
      
          const response = await fetch(apiEndpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
          const updatedUserData = await response.json(); // Parse the response
          return updatedUserData; // Return the updated user data
        
    } catch (error) {
        // If an error occurs during the fetch process, log the error and throw it again
        console.error('Error fetching user data:', error);
        throw error;
      }
}
// );

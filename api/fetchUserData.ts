/**
 * This file contains a function to fetch user data from the backend server.
 * It utilizes axios to make HTTP requests.
 */

import axios from 'axios';
import { User, FarmerDetails, Land, OfficerDetails} from "@/redux/types";

// Define the structure of the response data
interface UserDataResponse {
  user: User;
  farmerDetails: FarmerDetails;
  land: Land[];
  officerDetails: OfficerDetails;
  // 1. TODO - expandad this to get and details
}

/**
 * Function to fetch user data based on user ID from the backend server.
 * @param _id The ID of the user whose data needs to be fetched.
 * @returns A promise that resolves with the user data (including farmer details) if successful, or rejects with an error.
 */
export async function fetchUserData(_id: any): Promise<UserDataResponse> {
  try {
    // Make a GET request to the backend server to fetch user data
    const response = await axios.get(`http://localhost:5000/api/get/user/${_id}`);
        
    // Check if the request was successful`
    if (response.status === 200) {
      console.log("-------------Data coming from BE-----------"+ response.data);
      // Return the user data
      return response.data;
    }
    
    // If the request was not successful, throw an error
    throw new Error('Failed to fetch user data');
  } catch (error) {
    // If an error occurs during the fetch process, log the error and throw it again
    console.error('Error fetching user data:', error);
    throw error;
  }
}

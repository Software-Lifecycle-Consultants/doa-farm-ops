/**
 * This file contains a function to fetch crop data from the backend server.
 * It utilizes axios to make HTTP requests.
 */

import axios from 'axios';
import {Crop} from "@/redux/types";

// Define the structure of the response data
interface CropDataResponse {
  crops: Crop[];
}

/**
 * Function to fetch user data based on user ID from the backend server.
 * @param _id The ID of the user whose data needs to be fetched.
 * @returns A promise that resolves with the user data (including farmer details) if successful, or rejects with an error.
 */
export async function fetchCropData(_id: any): Promise<CropDataResponse> {
  try {
    // Make a GET request to the backend server to fetch crop data
    const response = await axios.get(`http://localhost:5000/api/get/crops/${_id}`);
        
    // Check if the request was successful`
    if (response.status === 200) {
      // Return the crop data
      return response.data;
    }
    
    // If the request was not successful, throw an error
    throw new Error('Failed to fetch crop data');
  } catch (error) {
    // If an error occurs during the fetch process, log the error and throw it again
    console.error('Error fetching crop data:', error);
    throw error;
  }
}

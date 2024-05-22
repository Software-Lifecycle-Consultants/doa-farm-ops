import axios from "axios";
import { OfficerDetails } from "@/redux/types";

/**
 * This file contains a function to update officer data on the backend server.
 * It utilizes axios to make HTTP requests.
 */

// Define the structure of the response data
interface UpdateResponse {
  officer: OfficerDetails;
}

/**
 * Function to update officer data on the backend server.
 * @param officerData The updated officer data.
 * @returns A promise that resolves with the updated officer data if successful, or rejects with an error.
 */
export async function UpdateOfficerData(
  officerData: any,
): Promise<UpdateResponse> {
  try {
    const officerDetails = officerData.officerData;
    const userId = officerData.userId;
    // Make a PUT request to the backend server to update officer data
    const response = await axios.put(
      `http://localhost:5000/api/user/updateofficer/${userId}`,
      officerDetails
    );

    // Check if the request was successful
    if (response.status === 200) {
      console.log(
        "-------------Data coming from BE-----------" + response.data
      );
      // Return the updated officer data
      return response.data;
    }

    // If the request was not successful, throw an error
    throw new Error("Failed to update officer data");
  } catch (error) {
    // If an error occurs during the update process, log the error and throw it again
    console.error("Error updating officer data:", error);
    throw error;
  }
}

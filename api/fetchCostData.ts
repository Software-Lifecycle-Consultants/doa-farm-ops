import axios from "axios";

/**
 * @param cropId The ID of the crop whose data needs to be fetched.
 * Function to fetch cost data based on crop ID from the backend server.
 */
export async function fetchCostData(cropId: string) {
    try {
        const response = await axios.get(`http://localhost:5000/api/get/cost/${cropId}`);
        // Check if the request was successful
        if (response.status === 200) {
            // Return the cost data
            return response.data;
        }

        // If the request was not successful, throw an error
        throw new Error("Failed to fetch cost data");
    } catch (error) {
        // If an error occurs during the fetch process, log the error and throw it again
        console.error("Error fetching cost data:", error);
        throw error;
    }
}

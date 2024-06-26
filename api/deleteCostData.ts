import axios from "axios";

/**
 * Function to delete cost data based on user ID from the backend server.
 */
export async function deleteCostData(costId: string) {
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/cost/delete/${costId}`
        );
        if (response && response.status === 200) {
            console.log("Delete cost response", response);
            return response;
        } else if (response && response.status === 400) {
            console.error("Failed to delete data");
        }
    } catch (error) {
        // If an error occurs during the fetch process, log the error and throw it again
        console.error('Error deleting cost data:', error);
        throw error;
    }
}

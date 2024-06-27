import axios from "axios";

/**
 * Function to add cost data based on user ID from the backend server.
 */
export async function addCostData(costdetails: any) {

    try{            
          const response = await axios.post(
            "http://localhost:5000/api/cost/add/", costdetails
          );
          if (response && response.status === 200) {
            console.log("Add cost response", response);
            return response;
          } else if (response && response.status === 400) {
            console.error("Failed to fetch data");
          }
       
    } catch (error) {
        // If an error occurs during the fetch process, log the error and throw it again
        console.error('Error fetching user data:', error);
        throw error;
      }
}

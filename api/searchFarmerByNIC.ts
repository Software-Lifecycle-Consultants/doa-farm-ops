// searchFarmerByNIC.ts
import axios from 'axios';
import { User, FarmerDetails, FarmerSearchResult } from '@/redux/types';


// Update the response type to match the new structure
interface FarmerDataResponse {
  user: User;
  farmerDetails: FarmerDetails;


}

export const searchFarmerByNIC = async (officerId: string, nic: string): Promise<FarmerDataResponse> => {
  const response = await axios.get<FarmerSearchResult[]>(`http://localhost:5000/api/officer/${officerId}/farmers?nic=${nic}`);
  console.log('Response data:', response.data); // Log the response data
  const searchData = response.data[0];

  // Extract user details from nested userId object
  const userId = searchData.userId;

  const user: User = {
    _id: userId._id,
    role: userId.role,
    firstName: userId.firstName,
    lastName: userId.lastName,
    email: userId.email,
    phoneNumber: userId.phoneNumber,
    nic: userId.nic,
    address: userId.address,
  };

  const farmerDetails: FarmerDetails = {
    household: searchData.household,
    orgName: searchData.orgName,
    orgAddress: searchData.orgAddress,
  };



  
  console.log('Constructed user:', user);
  console.log('Constructed farmerDetails:', farmerDetails);


  return { user, farmerDetails };
};

/*
types.ts where the RootState type is defined. 
The RootState type defines the structure of the Redux store's state. 
*/
export interface Auth {
  isAuthenticated:boolean;
  auth:{
    _id: string;
    email: string;
    userName: string;
    role: string;
    token: string;
  };
}

export interface Crop {
  cropName: string;
  season: string;
  cropType: string;
  totalSoldQty: string;
  totalIncome: string;
  reservedQtyHome: string;
  reservedQtySeed: string;
  noOfPicks: string;
  loanObtained: number;
  userId: string;
  landId: string;
  _id: string;
}
export interface Land {
  _id: string;
  landName: string;
  district: string |null;
  dsDivision: string;
  landRent: string;
  irrigationMode: string;
  userId: string;
  crops: any[];
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nic: string;
  role: string;
  address: string;
}

export interface FarmerDetails {
  household: string;
  orgName: string;
  orgAddress: string;
}

export interface OfficerDetails {
  orgName: string;
  orgAddress: string;
  university: string;
}

// Define the structure of the Redux store's state using the RootState type.
export type RootState = {
  auth: Auth;
  crop: {
    crops: Crop[] | null;
  }; // An array of Crop objects, representing the state of crop data.
  land: {
    lands: Land[] | null;
    };// An array of Land objects, representing the state of land data.
  user: { user: User | null };
  farmer: { farmerDetails: FarmerDetails | null };
  officer: { officerDetails: OfficerDetails | null };
};


/* NOTE :  Use the RootState type in components and selectors to ensure type safety when accessing the Redux state. 
*/
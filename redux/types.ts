interface Crop {
    cropDetails: {
      cropName: string;
      season: string;
      cropType: string;
      totalSoldQty: string;
      totalIncome: string;
      reservedQtyHome: string;
      reservedQtySeed: string;
      noOfPicks: string;
      loanObtained: number;
    };
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
    crops: any[]; // You may need to specify the type of this array if it's not always empty
    // createdAt: string;
    // updatedAt: string;
    // __v: number;
}
interface LandAndCrop {
  landId: string;
  landName: string;
  district: string;
  dsDivision: string;
  landRent: string;
  irrigationMode: string;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nic: string;
    role: string;
    address: string;
    password: string;
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

export interface UserWithOfficer {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nic: string;
    role: string;
    address: string;
    password: string;
  };
  officerDetails: {
    orgName: string;
    orgAddress: string;
    university: string;
  };
}

export interface UserWithFarmer {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nic: string;
    role: string;
    address: string;
    password: string;
  };
  farmerDetails: {
    household: string;
    orgName: string;
    orgAddress: string;
  };
}

  // Define the structure of the Redux store's state using the RootState type.
  export type RootState = {
    crops: Crop[]; // An array of Crop objects, representing the state of crop data.
    land: {
      lands: Land[] | null;
    };// An array of Land objects, representing the state of land data.
    landAndCrop: LandAndCrop;
    user: { user: User | null };
    farmer: { farmerDetails: FarmerDetails | null };
    officer: { officerDetails: OfficerDetails | null };
    userWithOfficer: UserWithOfficer;
    userWithFarmer: UserWithFarmer;
  };

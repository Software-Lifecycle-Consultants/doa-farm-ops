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
interface Land {
  landId: string; //should remove
  landName: string;
  district: string;
  dsDivision: string;
  landRent: string;
  irrigationMode: string;
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

interface Officer {
  officer: {
    orgName: string;
    orgAddress: string;
    university: string;
  };
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
    crop: Crop[]; // An array of Crop objects, representing the state of crop data.
    land: Land[];
    landAndCrop: LandAndCrop;
    user: User;
    farmer: FarmerDetails;
    officer: Officer;
    userWithOfficer: UserWithOfficer;
    userWithFarmer: UserWithFarmer;
  };

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
  landId: string;
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
  // Define the structure of the Redux store's state using the RootState type.
  export type RootState = {
    crop: Crop[]; // An array of Crop objects, representing the state of crop data.
    land: Land[];
    landAndCrop: LandAndCrop;
  };

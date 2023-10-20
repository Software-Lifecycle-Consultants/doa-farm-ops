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
  // Define the structure of the Redux store's state using the RootState type.
  export type RootState = {
    crop: Crop[];// An array of Crop objects, representing the state of crop data.
  };
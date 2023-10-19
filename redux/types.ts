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
  }
interface Land {
  landId: string;
  landName: string;
  district: string;
  dsDivision: string;
  landRent: string;
  irrigationMode: string;
}
  export type RootState = {
    crop: Crop[];
    land: Land[];
  };
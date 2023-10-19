interface Data {
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
interface land {
    landName: string;
    district: string;
    dsDivision: string;
    landRent: string;
    irrigationMode: string;
}
export type RootState = {
  crop: Data[];
  land: land[];
};

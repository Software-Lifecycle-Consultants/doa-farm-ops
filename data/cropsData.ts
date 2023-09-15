interface Data {
  landname: string;
  season: string;
  cropName: string;
  cropType: string;
  soldQty: number;
  totalIncome: number;
  reservedQty: number;
  qtyForSeed: number;
  noOfPicks: number;
  icons: string;
  button: string;
}

function createData(
  landname: string,
  season: string,
  cropName: string,
  cropType: string,
  soldQty: number,
  totalIncome: number,
  reservedQty: number,
  qtyForSeed: number,
  noOfPicks: number,
  icons: string,
  button: string,
): Data {
  return { landname, season, cropName, cropType, soldQty, totalIncome, reservedQty, qtyForSeed, noOfPicks, icons, button};
}

export const rows = [
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", 1, 1, 1, 1, 1, "", ""),
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", 1, 1, 1, 1, 1, "", ""),
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", 1, 1, 1, 1, 1, "", ""),
];


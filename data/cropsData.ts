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

export const seasons = [
  { value: '', label: 'None' },
  { value: 10, label: 'Season 1' },
  { value: 20, label: 'Season 2' },
  { value: 30, label: 'Season 3' },
];
export const lands = [
  { value: '', label: 'None' },
  { value: 10, label: 'Land 1' },
  { value: 20, label: 'Land 2' },
  { value: 30, label: 'Land 3' },
];

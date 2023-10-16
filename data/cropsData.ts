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

function createData(
  landId: string,
  cropName: string,
  season: string,
  cropType: string,
  totalSoldQty: string,
  totalIncome: string,
  reservedQtyHome: string,
  reservedQtySeed: string,
  noOfPicks: string,
  loanObtained: number,
): Data {
  return { landId,
    cropDetails: {
      cropName,
      season,
      cropType,
      totalSoldQty,
      totalIncome,
      reservedQtyHome,
      reservedQtySeed,
      noOfPicks,
      loanObtained,
    }
  };
}

export const rows = [
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", "1", "1", "1", "1", "1", 11),
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", "1", "1", "1", "1", "1", 11),
  createData("Udumulla Land", "Season 1", "Crop 1", "Paddy", "1", "1", "1", "1", "1", 11),
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

export const cropList = [
      {
        type: 'Paddy',
        name: 'Basmati'
      },
      {
        type: 'Paddy',
        name: 'Red Rice'
      },
      {
        type: 'Paddy',
        name: 'Samba'
      },
      {
        type: 'Paddy',
        name: 'Keeri Samba'
      },
      {
        type: 'Paddy',
        name: 'Nadu'
      },
      {
        type: 'Tea',
        name: 'Black Tea'
      },
      
]

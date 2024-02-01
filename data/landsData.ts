interface Data {
  landname: string;
  district: string;
  division: string;
  rent: number;
  irrigation: string;
  button: string;
  icons: string;
}

function createData(
  landname: string,
  district: string,
  division: string,
  rent: number,
  irrigation: string,
  button: string,
  icons: string
): Data {
  return { landname, district, division, rent, irrigation, button, icons };
}


export const rows = [
  createData("Udumulla Land", "Colombo", "Kaduwela", 33, "Well", "", ""),
  createData("Udumulla Land 2", "Colombo", "Kaduwela", 33, "Well", "", ""),
  createData("Udumulla Land 3", "Colombo", "Kaduwela", 33, "Well", "", ""),
];

export const districtList = [
  { name: 'Jaffna'},
  { name: 'Kilinochchi'},
  { name: 'Mannar'},
  { name: 'Mullaitivu'},
  { name: 'Vavuniya'},
  { name: 'Puttalam'},
  { name: 'Kurunegala'},
  { name: 'Gampaha'},
  { name: 'Colombo'},
  { name: 'Kalutara'},
  { name: 'Anuradhapura'},
  { name: 'Polonnaruwa'},
  { name: 'Matale'},
  { name: 'Kandy'},
  { name: 'Nuwara Eliya'},
  { name: 'Kegalle'},
  { name: 'Ratnapura'},
  { name: 'Trincomalee'},
  { name: 'Batticaloa'},
  { name: 'Badulla'},
  { name: 'Monaragala'},
  { name: 'Hambantota'},
  { name: 'Matara'},
  { name: 'Galle'},
]
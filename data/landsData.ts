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

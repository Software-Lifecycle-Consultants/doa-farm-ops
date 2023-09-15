export interface FarmerProfileData {
    nic: string;
    email: string;
    firstname: string;
    lastname: string;
    address: string;
    phonenumber: string;
    household: string;
    otherdetails: {
        orgname: string,
        orgaddress: string
      },
      landDetails: {
        lname: string,
        district: string,
        dsdivison: string,
        irrigationMode: string,
      },
      createdBy: string,
      createdAt: string,
  }

export const sampleFarmerProfileData: FarmerProfileData = {
    nic: "99123456V",
    email: "sugath@gmail.com",
    firstname: "Sugath",
    lastname: "Jayaweera",
    address: "Pretty View Lane",
    phonenumber: "+9471345678",
    household: "3",
    otherdetails: {
      orgname: "Green Asia Pvt Ltd",
      orgaddress: "115/A, Borella Road, Rajagiriya"
    },
    landDetails: {
      lname: "Udumaulla blk1",
      district: "Monaragala",
      dsdivison: "Monaragal DV1",
      irrigationMode: "Surface irrigation",
    },
    createdBy:"+9471345678",
    createdAt:"YYYY-MM-DD hh:mm:ss",
  };

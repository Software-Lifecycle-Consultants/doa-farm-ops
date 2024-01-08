export interface FarmerProfileData {
  nic: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  household: string;
  otherDetails: {
    orgName: string,
    orgAddress: string
  },
  landDetails: {
    lname: string,
    district: string,
    dsDivision: string,
    irrigationMode: string,
  },
  createdBy: string,
  createdAt: string,
}

export const sampleFarmerProfileData: FarmerProfileData = {
  nic: "99123456V",
  email: "sugath@gmail.com",
  firstName: "Sugath",
  lastName: "Jayaweera",
  address: "Pretty View Lane",
  phoneNumber: "+9471345678",
  household: "3",
  otherDetails: {
    orgName: "Green Asia Pvt Ltd",
    orgAddress: "115/A, Borella Road, Rajagiriya"
  },
  landDetails: {
    lname: "Udumaulla blk1",
    district: "Monaragala",
    dsDivision: "Monaragal DV1",
    irrigationMode: "Surface irrigation",
  },
  createdBy: "+9471345678",
  createdAt: "YYYY-MM-DD hh:mm:ss",
};

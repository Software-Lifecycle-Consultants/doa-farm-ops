export interface OfficerProfileData {
    nic: string;
    email: string;
    firstname: string;
    lastname: string;
    address: string;
    phonenumber: string;
    organization:{
        name:string,
        address:string
     },
     education:{
        university:string
     },
     createdBy:string,
     createdAt:string,
     deletedAt: null
  }

  export const sampleOfficerProfileData: OfficerProfileData = {
    nic:"99123456V",
    email:"sugath@gmail.com",
    firstname:"Sugath",
    lastname:"Jayaweera",
    address:"Pretty View Lane",
    phonenumber:"+9471345678",
    organization:{
       name:"Green Asia Pvt Ltd",
       address:"115/A, Borella Road, Rajagiriya"
    },
    education:{
       university:"University of Colombo"
    },
    createdBy:"+9471345678",
    createdAt:"YYYY-MM-DD hh:mm:ss",
    deletedAt: null
 };
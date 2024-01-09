export interface OfficerProfileData {
   nic: string;
   email: string;
   firstName: string;
   lastName: string;
   address: string;
   phoneNumber: string;
   organization: {
      name: string,
      address: string
   },
   education: {
      university: string
   },
   createdBy: string,
   createdAt: string,
   deletedAt: null
}

export const sampleOfficerProfileData: OfficerProfileData = {
   nic: "99123456V",
   email: "sugath@gmail.com",
   firstName: "Sugath",
   lastName: "Jayaweera",
   address: "Pretty View Lane",
   phoneNumber: "+9471345678",
   organization: {
      name: "Green Asia Pvt Ltd",
      address: "115/A, Borella Road, Rajagiriya"
   },
   education: {
      university: "University of Colombo"
   },
   createdBy: "+9471345678",
   createdAt: "YYYY-MM-DD hh:mm:ss",
   deletedAt: null
};
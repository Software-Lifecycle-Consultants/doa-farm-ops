"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigationToSignIn = () => {
    router.push("/SignIn");
  };

  const navigationToRegistration = () => {
    router.push("/SignUp");
  };

  const navigationToOfficerProfile = () => {
    router.push("/OfficerProfile");
  };

  const navigationToFarmerProfile = () => {
    router.push("/FarmerProfile");
  };
  const navigationToAddLand = () => {
    router.push("/AddLand");
  };
  const navigationToAddCrop = () => {
    router.push("/AddCrop");
  };
  const navigationToMyCrops = () => {
    router.push("/MyCrops");
  };
  const navigationToAddOperationCost = () => {
    router.push("/AddOperationCost");
  };

  return (
    <>
      <button onClick={navigationToSignIn}>Go to Login</button>
      <button onClick={navigationToRegistration}>Go to SignUp</button>
      <button onClick={navigationToOfficerProfile}>Go to Officer Profile </button>
      <button onClick={navigationToFarmerProfile}>Go to Farmer Profile </button>
      <button onClick={navigationToAddLand}>Go to Add Land</button>
      <button onClick={navigationToAddCrop}>Go to Add Crop</button>
      <button onClick={navigationToMyCrops}>Go to My Crops</button>
      <button onClick={navigationToAddOperationCost}>Go to Add Operation Cost</button>
    </>
  );
}

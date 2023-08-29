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

  return (
    <>
      <button onClick={navigationToSignIn}>Go to Login</button>
      <button onClick={navigationToRegistration}>Go to SignUp</button>
      <button onClick={navigationToOfficerProfile}>Go to Officer Profile </button>
      <button onClick={navigationToFarmerProfile}>Go to Farmer Profile </button>
      <button onClick={navigationToAddLand}>Go to Add Land</button>
    </>
  );
}

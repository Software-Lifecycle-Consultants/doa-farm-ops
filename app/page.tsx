"use client";

import React from "react";
import HomePageBanner from "@/components/HomePageBanner"

/* Typography style */
const typography1Styles = {
  color: "#0C111F",
  fontFamily: "Inter",
  fontSize: { xs: "14px", sm: "16px", md: "24px" },
  lineHeight: "130%",
  fontStyle: "inter",
  letterSpacing: "2px",
  marginLeft: { xs: "26px", sm: "4px", md: "25px" },
  textAlign: { xs: "center", sm: "center", md: "left" },
};

const typography2Styles = {
  color: "#0C111F",
  fontFamily: "Istok Web",
  fontSize: { xs: "22px", sm: "42px", md: "48px" },
  lineHeight: "130%",
  fontStyle: "bold",
  letterSpacing: "2px",
  marginLeft: { xs: "26px", sm: "40px", md: "25px" },
  textAlign: { xs: "center", sm: "center", md: "left" },
};

const typography3Styles = {
  color: "#0C111F",
  fontFamily: "Istok Web",
  fontSize: { xs: "16px", sm: "32px", md: "24px" },
  lineHeight: "130%",
  fontStyle: "inter",
  letterSpacing: "2px",
  textAlign: { xs: "center", sm: "center", md: "left" },
};
const typography4Styles = {
  color: "#0C111F",
  fontFamily: "Istok Web",
  fontSize: { xs: "16px", sm: "18px", md: "22px" },
  lineHeight: "130%",
  fontStyle: "inter",
  letterSpacing: "2px",
  textAlign: "center",
};

/* Button style for contained variant */
const buttonContainedStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "100px",
  textTransform: "none",
  fontWeight: "Bold",
  color: "#0C111F",
  background: "var(--l-2, linear-gradient(135deg, #FFFDFD 50%, #90EA8E 0%))",
  // Customize sizes for web and tablet view
  "@media (max-width: 1024px)": {
    padding: "10px 16px",
  },
  // Customize sizes for mobile view
  "@media (max-width: 767px)": {
    fontSize: "12px",
    padding: "6px 8px",
    margin: "3px",
    marginLeft: { xs: "2px", sm: "2px", md: "25px"},
  },
};

/* Index functional component */
const Index = () => {
  return (
    <>
   <HomePageBanner/>
    </>
  );
};

export default Index;

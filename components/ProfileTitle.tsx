"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
interface  ProfileTitleProps  {
    title: string;
}

export default function ProfileTitle({title}: ProfileTitleProps) {
  return (
    <Box sx={{ backgroundColor: "", paddingTop:"30px",paddingLeft:"5px" }}>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          color: "#000",
          leadingTrim: "both",
          textEdge: "cap",
          
          fontSize: "30px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          borderLeft: '6px solid #3665C5',
          padding: '5px'
        }}
      >
        {title}
      </Typography>
    </Box>
  );}
import * as React from "react";
import Box from "@mui/material/Box";
import SignIn from "@/pages/SignIn";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SignIn />
    </Box>
  );
}

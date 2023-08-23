import * as React from "react";
import Box from "@mui/material/Box";
import SignUp from "./Register";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SignUp />
    </Box>
  );
}

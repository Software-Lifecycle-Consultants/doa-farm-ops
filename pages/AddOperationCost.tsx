import * as React from "react";
import Grid from "@mui/material/Grid";
import ProfileTitle from "../components/ProfileTitle";

export default function AddOperationCost() {
    return(
        <Grid container direction="column" rowGap={2}>
      <Grid item xs={12}>
        <ProfileTitle title="Add Operation Cost" />
      </Grid>
      </Grid>
    );
}
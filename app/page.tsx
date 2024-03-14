import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";






const action = (
  <Button color="secondary" size="small" >
    Read More
  </Button>
); 

export default function RowAndColumnSpacing() {
  return (
    <Grid container spacing={2} columns={16} marginTop={6} padding={16}>
      <Grid xs={8}>
        <Stack spacing={4} sx={{ maxWidth: 809 }} marginTop={8}>
          <SnackbarContent
            message="How DoA Crop Data platform helps you"
            action={action}
          />
        </Stack>

        <Typography
          fontSize={48}
          fontFamily="cursive"
          fontStyle={"bold"}
          gutterBottom
          marginTop={4}
          textAlign="left"
        >
          Update farmer crop costs to help us manage Agriculture sector
          development better
        </Typography>

        <Typography
          fontSize={20}
          fontFamily="system-ui"
          fontStyle={"italic"}
          gutterBottom
          marginTop={4}
        >
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </Typography>

        <Button variant="contained" color="success">
          Department of Agriculture Digitzation effort.
        </Button>
      </Grid>

      {/* image goes here */}

      <Grid xs={8} padding={8} >
        <img
          src="https://thumbs.dreamstime.com/z/hand-drawn-vector-illustration-golden-yellow-rice-ear-transparent-background-highly-detailed-realistic-stile-rice-oryza-104436718.jpg?ct=jpeg"
          alt="random"
          width="524"
          height="500"
        />
      </Grid>
    </Grid>
  );
}

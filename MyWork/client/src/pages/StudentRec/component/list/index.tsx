import React from "react";
import { Typography, Card, CardHeader, CardContent } from "@mui/material";
// import AddNewRecords from "./addNewRecords";
import CusScheduler from "./view";

export const StuRecList = () => {
  return (
    <>
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={<Typography variant="h5">Records</Typography>}
      />

      <Card
        sx={{
          backgroundColor: "#FCFCFC",
        }}
      >
        <CardContent>
          <CusScheduler />
        </CardContent>

        {/* <CardHeader
          sx={{ display: "flex", flexWrap: "wrap" }}
          title={<Typography variant="h6">Add New Records</Typography>}
        />
        <CardContent>
          <AddNewRecords />
        </CardContent> */}
      </Card>
    </>
  );
};

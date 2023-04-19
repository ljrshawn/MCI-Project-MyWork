import React from "react";
import { Typography, Card, CardHeader, CardContent } from "@mui/material";
import AddNewRecords from "./addNewRecords";
// import CusScheduler from "./view";

export const StuRecList = () => {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#FCFCFC",
        }}
      >
        <CardHeader
          sx={{ display: "flex", flexWrap: "wrap" }}
          title={<Typography variant="h5">Records</Typography>}
        />
        {/* <CardContent>
          <CusScheduler />
        </CardContent> */}
      </Card>

      <Card
        sx={{
          mt: 4,
          backgroundColor: "#FCFCFC",
        }}
      >
        <CardHeader
          sx={{ display: "flex", flexWrap: "wrap" }}
          title={<Typography variant="h6">Add New Records</Typography>}
        />
        <CardContent>
          <AddNewRecords />
        </CardContent>
      </Card>
    </>
  );
};

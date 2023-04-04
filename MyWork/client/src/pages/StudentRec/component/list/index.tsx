import React from "react";
import { Typography, Card, CardHeader, CardContent } from "@mui/material";
import { List, ImportButton, RefreshButton } from "@pankod/refine-mui";
import DateTimePickers from "./timePick";

import { AddNew } from "./addNew";

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
          <DateTimePickers />
        </CardContent>
      </Card>
    </>
  );
};

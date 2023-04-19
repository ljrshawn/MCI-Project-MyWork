import React from "react";
import { Typography, CardHeader } from "@mui/material";

import { PerRecords } from "./personalRecord";
import { TeamRecords } from "./teamRecords";

export const StudentHome = () => {
  return (
    <>
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={<Typography variant="h5">DashBoard</Typography>}
      />

      <PerRecords />
      <TeamRecords />
    </>
  );
};

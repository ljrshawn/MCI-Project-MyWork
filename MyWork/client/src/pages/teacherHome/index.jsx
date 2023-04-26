import React from "react";
import { CardHeader, Typography } from "@pankod/refine-mui";
import VirtualizedList from "./main";

export const TeacherHome = () => {
  return (
    <>
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={<Typography variant="h5">DashBoard</Typography>}
      />
      <VirtualizedList />
    </>
  );
};

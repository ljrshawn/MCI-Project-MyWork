import React from "react";
import { Typography, CardHeader } from "@mui/material";
import { useList } from "@pankod/refine-core";

import { PerRecords } from "./personalRecord";
import { TeamRecords } from "./teamRecords";

export const StudentHome = () => {
  const { data, isLoading } = useList({
    resource: "stu_records",
    config: {
      hasPagination: false,
    },
  });

  return (
    <>
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={<Typography variant="h5">DashBoard</Typography>}
      />

      <PerRecords data={data} />
      <TeamRecords />
    </>
  );
};

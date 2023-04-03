import React from "react";
import { Typography } from "@mui/material";
import { List, ImportButton, RefreshButton } from "@pankod/refine-mui";

import { AddNew } from "./addNew";

export const StuRecList = () => {
  return (
    <List
      title={<Typography variant="h5">Records</Typography>}
      children={<AddNew />}
    />
  );
};

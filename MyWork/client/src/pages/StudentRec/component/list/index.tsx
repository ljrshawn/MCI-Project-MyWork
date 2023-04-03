import React from "react";
import { Typography } from "@mui/material";
import { List, ImportButton, RefreshButton } from "@pankod/refine-mui";

import { CustomButton } from "../../../component/button/addButton";

export const StuRecList = () => {
  return (
    <List
      title={<Typography variant="h5">Records</Typography>}
      headerButtons={() => (
        <>
          <CustomButton url="/records/create" value="Add Records" />
        </>
      )}
      wrapperProps={{
        sx: {
          backgroundColor: "#FCFCFC",
        },
      }}
      // children={}
    />
  );
};

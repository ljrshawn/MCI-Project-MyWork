import React from "react";
import { Typography } from "@mui/material";
import { List, ImportButton } from "@pankod/refine-mui";
import { useImport } from "@pankod/refine-core";

import { CustomButton } from "../../../component/button/newPageButton";
import DataGridCus from "./dataGrid";

export const TecManList = () => {
  interface IPostFile {
    Emplid: string;
    "Last Name": string;
    "First Names": string;
  }

  const { inputProps, isLoading } = useImport<IPostFile>({
    resourceName: "manage/import",
    mapData: (item) => {
      return {
        studentId: "a" + item.Emplid,
        firstName: item["First Names"],
        lastName: item["Last Name"],
      };
    },
    onFinish: () => {
      window.location.reload();
    },
  });

  return (
    <List
      title={<Typography variant="h5">Manages</Typography>}
      headerButtons={() => (
        <>
          {/* <RefreshButton hideText sx={{ color: "#2ECC71" }} /> */}
          <ImportButton
            inputProps={inputProps}
            loading={isLoading}
            sx={{ color: "#2ECC71" }}
          />
          <CustomButton url="/manage/create" value="Add" />
        </>
      )}
      wrapperProps={{
        sx: {
          backgroundColor: "#FCFCFC",
        },
      }}
    >
      <DataGridCus />
    </List>
  );
};

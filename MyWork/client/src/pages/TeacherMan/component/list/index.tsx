import React from "react";
import { Typography } from "@mui/material";
import { List, ImportButton, RefreshButton } from "@pankod/refine-mui";
import { useImport } from "@pankod/refine-core";

import { CustomButton } from "../../../component/button/addButton";
import DataGridCus from "./dataGrid";

export const TecManList = () => {
  let needFresh = false;

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
  });

  return (
    <List
      title={<Typography variant="h5">Manages</Typography>}
      headerButtons={() => (
        <>
          <RefreshButton hideText />
          <ImportButton hideText inputProps={inputProps} loading={isLoading} />
          <CustomButton url="/manage/create" value="Add" />
        </>
      )}
      wrapperProps={{
        sx: {
          backgroundColor: "#FCFCFC",
        },
      }}
    >
      <DataGridCus fresh={needFresh} />
    </List>
  );
};

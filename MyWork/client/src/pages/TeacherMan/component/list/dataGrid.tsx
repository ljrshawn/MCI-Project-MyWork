import React from "react";
import { Box } from "@mui/material";
import { EditButton, DeleteButton } from "@pankod/refine-mui";
import { useDataGrid } from "@pankod/refine-mui";

import { DataGrid, GridColumns } from "@mui/x-data-grid";

export default function DataGridCus(fresh: any) {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColumns<any>>(
    () => [
      {
        field: "studentId",
        headerName: "Student ID",
        width: 150,
      },
      {
        field: "firstName",
        headerName: "First name",
        width: 150,
      },
      {
        field: "lastName",
        headerName: "Last name",
        width: 150,
      },
      {
        field: "team",
        headerName: "Team",
        width: 100,
      },
      {
        field: "totalHour",
        headerName: "Total Hour",
        width: 150,
      },
      {
        field: "tag",
        headerName: "Tag",
        width: 150,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton size="small" recordItemId={row.id} hideText={true} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        backgroundColor: "#FCFCFC",
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        checkboxSelection
        disableColumnMenu
      />
    </Box>
  );
}

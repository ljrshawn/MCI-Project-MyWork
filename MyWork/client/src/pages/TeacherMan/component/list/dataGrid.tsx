import React from "react";
import { Box } from "@mui/material";
import {
  EditButton,
  DeleteButton,
  GridSelectionModel,
  GridCallbackDetails,
  useAutocomplete,
  TextField,
  Autocomplete,
  createFilterOptions,
  SaveButton,
} from "@pankod/refine-mui";
import { useDataGrid } from "@pankod/refine-mui";

import { DataGrid, GridColumns } from "@mui/x-data-grid";

import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { useDelete, useUpdate } from "@pankod/refine-core";

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
              <EditButton
                size="small"
                recordItemId={row.id}
                hideText={true}
                sx={{ color: "#2ECC71" }}
              />
              <DeleteButton
                hideText
                recordItemId={row.id}
                sx={{ color: "#E74C3C" }}
              />
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

  const [disabledButton, setDisabledButton] = React.useState(true);
  const [ids, setIds] = React.useState<GridSelectionModel>([]);

  const handleOnSelectionModelChange = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails
  ) => {
    if (selectionModel.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    setIds(selectionModel);
  };

  const {
    refineCore: { queryResult },
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: teamAutocompleteProps } = useAutocomplete({
    resource: "teams",
    hasPagination: false,
  });

  const samplesData = queryResult?.data?.data;

  const filter = createFilterOptions({
    stringify: (option: any) => option?.number,
  });

  const [value, setValue] = React.useState(samplesData);

  const { mutate: deleteMutate, isLoading: deleteLoading } = useDelete();
  const { mutate: updateMutate, isLoading: updateLoading } = useUpdate();

  const handleEditMany = (edit: "delete" | "team") => {
    if (edit === "delete") {
      ids.map((el) => {
        deleteMutate({
          resource: `manage`,
          id: el,
        });
      });
    } else {
      ids.map((el) => {
        updateMutate({
          resource: "manage",
          values: {
            team: value?.team,
          },
          id: el,
        });
      });
      setValue(samplesData);
    }
  };

  return (
    <>
      <Box
        display="flex"
        gap="16px"
        sx={{ justifyContent: "flex-end", alignItems: "center", mb: 2 }}
      >
        <Controller
          control={control}
          name="team"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              disabled={disabledButton}
              {...teamAutocompleteProps}
              {...field}
              value={value || " "}
              onChange={(_, value) => {
                field.onChange(value.inputValue || value.number);
                setValue((prev) => {
                  if (prev === undefined) {
                    prev = { team: value.inputValue || value.number };
                  }
                  prev.team = value.inputValue || value.number;
                  return prev;
                });
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.number
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    number: `Add: "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              handleHomeEndKeys
              options={teamAutocompleteProps.options}
              getOptionLabel={(item) => {
                // Add "xxx" option created dynamically
                if (item.number) {
                  return item.number;
                }
                // Regular option
                return item.team ?? "";
              }}
              isOptionEqualToValue={(option, value) => {
                return (
                  value === undefined ||
                  value?.team === " " ||
                  value?.team === "NO TEAM" ||
                  option?.number?.toString() === value?.team?.toString()
                );
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.number}>
                    {option.number}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Team"
                  margin="none"
                  variant="outlined"
                  size="small"
                  error={!!(errors as any)?.team?.number}
                  helperText={(errors as any)?.team?.number?.message}
                  disabled={disabledButton}
                  color="info"
                />
              )}
            />
          )}
        />
        <SaveButton
          disabled={disabledButton}
          loading={updateLoading}
          variant="text"
          color="info"
          onClick={() => {
            handleEditMany("team");
          }}
        />
        <DeleteButton
          disabled={disabledButton || deleteLoading}
          sx={{ color: "#E74C3C" }}
          onClick={() => {
            handleEditMany("delete");
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#FCFCFC",
          height: 700,
          width: "100%",
        }}
      >
        <DataGrid
          {...dataGridProps}
          columns={columns}
          checkboxSelection
          disableColumnMenu
          onSelectionModelChange={handleOnSelectionModelChange}
        />
      </Box>
    </>
  );
}

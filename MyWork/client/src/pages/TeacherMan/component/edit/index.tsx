import React from "react";
import {
  Edit,
  useAutocomplete,
  TextField,
  Autocomplete,
  Box,
  Typography,
  createFilterOptions,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

const filter = createFilterOptions({
  stringify: (option: any) => option?.number,
});

export const TecManEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const samplesData = queryResult?.data?.data;

  const { autocompleteProps: teamAutocompleteProps } = useAutocomplete({
    resource: "teams",
    hasPagination: false,
  });

  const [value, setValue] = React.useState(samplesData);

  if (samplesData !== undefined && value === undefined) {
    setValue(samplesData);
  }

  return (
    <Edit
      title={
        <Typography variant="h5">Edit {samplesData?.studentId}</Typography>
      }
      deleteButtonProps={{ size: "small" }}
      saveButtonProps={saveButtonProps}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("studentId", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.studentId}
          helperText={(errors as any)?.studentId?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="string"
          label="Student Id"
          name="studentId"
          disabled
        />
        <TextField
          {...register("firstName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.firstName}
          helperText={(errors as any)?.firstName?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="string"
          label="First Name"
          name="firstName"
          disabled
        />
        <TextField
          {...register("lastName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.lastName}
          helperText={(errors as any)?.lastName?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="string"
          label="Last Name"
          name="lastName"
          disabled
        />
        <Controller
          control={control}
          name="team"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
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
                    number: `Add Team: "${inputValue}"`,
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
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.team?.number}
                  helperText={(errors as any)?.team?.number?.message}
                />
              )}
            />
          )}
        />
        <TextField
          {...register("tag", {})}
          error={!!(errors as any)?.tag}
          helperText={(errors as any)?.tag?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="string"
          label="Tag"
          name="tag"
        />
      </Box>
    </Edit>
  );
};

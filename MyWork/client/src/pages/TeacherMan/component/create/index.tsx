import React from "react";
import { Create, TextField, Box, Typography } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import SaveIcon from "@mui/icons-material/Save";

import { CustomLoadingButtonStyle } from "utils/customButton";

export const TecManCreate = () => {
  const {
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Create
      title={<Typography variant="h5">Create New Student</Typography>}
      footerButtons={() => (
        <>
          <CustomLoadingButtonStyle
            onClick={handleSubmit(onFinish)}
            loading={formLoading}
            loadingPosition="start"
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </CustomLoadingButtonStyle>
        </>
      )}
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
          type="text"
          label="Student Id"
          name="studentId"
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
          multiline
          label="First Name"
          name="firstName"
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
          multiline
          label="Last Name"
          name="lastName"
        />
      </Box>
    </Create>
  );
};

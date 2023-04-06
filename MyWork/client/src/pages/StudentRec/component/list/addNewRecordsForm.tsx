import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { Stack, Divider, TextField, Button, Typography } from "@mui/material";

import { CustomSaveButton } from "pages/component/button/cusSaveButtom";

import { newRecordsForm } from "../../../component/interface/form";

const AddNewRecordsForm = ({
  start,
  end,
  hour,
  handleStartTime,
  startMaxTime,
  handleEndTime,
  handleHourTime,
  handleEvidenceChange,
  register,
  errors,
  handleSubmit,
  formLoading,
  onFinishHandler,
  evidenceImg,
}: newRecordsForm) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onFinishHandler)}>
        <Stack justifyContent="space-between" alignItems="stretch" spacing={6}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem light></Divider>}
            justifyContent="space-evenly"
            alignItems="center"
            spacing={3}
          >
            <MobileDatePicker
              disableFuture
              label="Date"
              value={start}
              onChange={(newValue) => handleStartTime(newValue)}
            />
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <MobileTimePicker
                maxTime={startMaxTime()}
                label="Start Time"
                value={start}
                onChange={(newValue) => handleStartTime(newValue)}
              />
              <MobileTimePicker
                maxTime={startMaxTime()}
                minTime={start}
                label="End Time"
                value={end}
                onChange={(newValue) => handleEndTime(newValue)}
                onAccept={handleHourTime}
              />
            </Stack>
            <TextField
              id="outlined-read-only-input"
              label="Total Hours"
              value={hour}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>

          <TextField
            {...register("task", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.task}
            helperText={(errors as any)?.task?.message}
            margin="normal"
            sx={{ m: 1, width: "30%" }}
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Task *"
            name="task"
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ECC71",
                  "&:hover": {
                    backgroundColor: "#FCFCFC",
                    color: "#2ECC71",
                    opacity: 0.6,
                  },
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Evidence
                <Typography fontSize={14} color="#CC2E89" align="center">
                  (image/*.)
                </Typography>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleEvidenceChange(e.target.files![0]);
                  }}
                />
              </Button>

              <Typography
                fontSize={14}
                color="#808191"
                sx={{ wordBreak: "break-all" }}
              >
                {evidenceImg?.name}
              </Typography>
            </Stack>

            <CustomSaveButton
              type="submit"
              value="Add New"
              loading={formLoading}
              loadingPosition="start"
            />
          </Stack>
        </Stack>
      </form>
    </LocalizationProvider>
  );
};

export default AddNewRecordsForm;

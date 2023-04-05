import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { Stack, Divider, TextField, Button, Typography } from "@mui/material";

import { CustomButton } from "pages/component/button/addButton";

export default function DateTimePickers() {
  const [start, setStart] = React.useState<Dayjs | null>(dayjs());
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs());
  const [hour, setHour] = React.useState("0");
  const [task, setTask] = React.useState("");
  const [propertyImage, setPropertyImage] = React.useState({
    name: "",
    url: "",
  });

  const startMaxTime = () => {
    if (!start?.isBefore(dayjs(dayjs().format().slice(0, 10)))) {
      return dayjs();
    }
  };

  const handelTaskInput = (value: any) => {
    setTask(value);
  };

  const handleEvidenceChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => {
      setPropertyImage({ name: file?.name, url: result });
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            onChange={(newValue) => {
              setStart(newValue);
              setEnd(newValue);
            }}
          />
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <MobileTimePicker
              maxTime={startMaxTime()}
              label="Start Time"
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
                setEnd(newValue);
              }}
            />
            <MobileTimePicker
              maxTime={startMaxTime()}
              minTime={start}
              label="End Time"
              value={end}
              onChange={(newValue) => setEnd(newValue)}
              onAccept={() => {
                const minutes = end?.diff(start, "minute") ?? 0;
                const hour = String((minutes / 60).toFixed(2));

                setHour(hour);
              }}
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
          id="outlined-basic"
          label="Task *"
          variant="outlined"
          value={task}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handelTaskInput(event.target.value);
          }}
          sx={{ m: 1, width: "30%" }}
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
              <Typography
                fontSize={14}
                color="#CC2E89"
                align="center"
                // sx={{ wordBreak: "break-all" }}
              >
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
              {propertyImage?.name}
            </Typography>
          </Stack>
          <CustomButton url="" value="Add New" />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}

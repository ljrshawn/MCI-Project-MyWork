import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Stack, Divider } from "@mui/material";

export default function DateTimePickers() {
  const [start, setStart] = React.useState<Dayjs | null>(
    dayjs(new Date().toLocaleString())
  );
  console.log(start?.format());

  const [end, setEnd] = React.useState<Dayjs | null>(
    dayjs(new Date().toLocaleString())
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["MobileDateTimePicker", "MobileDateTimePicker"]}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem light></Divider>}
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <MobileDateTimePicker
            label="Start Time"
            value={start}
            onChange={(newValue) => setStart(newValue)}
          />
          <MobileDateTimePicker
            label="End Time"
            value={end}
            onChange={(newValue) => setEnd(newValue)}
          />
        </Stack>
      </DemoContainer>
    </LocalizationProvider>
  );
}

import * as React from "react";
import { Dialog, DialogActions, DialogContent, Paper } from "@mui/material";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import dayjs from "dayjs";

import {
  ViewState,
  AppointmentModel,
  SchedulerDateTime,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  DayView,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";

import { useList } from "@pankod/refine-core";

import { LoadingButton } from "@pankod/refine-mui";
import { ShowEvidence } from "pages/component/chartModel/showEvidence";

import { openDialogProps } from "pages/component/interface/form";
import { CustomButtonStyle } from "pages/component/button/cusButtonStyle";

interface detailProps extends openDialogProps {
  query: {
    userId: string;
    year: string;
    month: string;
    date: string;
  };
}

const DetailView = ({ open, handleClose, query }: detailProps) => {
  const { data, isLoading } = useList({
    resource: `records/dateDetail`,
    config: {
      hasPagination: false,
      filters: [
        {
          field: "userId",
          operator: "eq",
          value: query.userId,
        },
        {
          field: "year",
          operator: "eq",
          value: query.year,
        },
        {
          field: "month",
          operator: "eq",
          value: query.month,
        },
        {
          field: "date",
          operator: "eq",
          value: query.date,
        },
      ],
    },
  });

  const dataIni = () => {
    const DI: AppointmentModel[] =
      data?.data.map((el) => {
        const d: AppointmentModel = {
          title: el.task,
          startDate: new Date(el.start),
          endDate: new Date(el.end),
          id: el.id,
          evidence: el.evidence,
          hour: el.hour,
        };

        return d;
      }) || [];

    return DI;
  };

  const [schedualData, setSchedualData] = React.useState<AppointmentModel[]>(
    []
  );

  const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(
    dayjs().format()
  );

  if (data !== undefined && schedualData.length === 0) {
    setSchedualData(dataIni());
    setCurrentDate(data?.data[0].fullDate);
  }

  const [openPerEvidence, setOpenPerEvidence] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [perEvidenceId, setPerEvidenceId] = React.useState("");

  const handlePerEvidenceClose = () => {
    setOpenPerEvidence(false);
    setLoading(false);
  };

  const showEvi = (props: any) => {
    if (props.evidence[0].name !== "") {
      return (
        <>
          <LoadingButton
            loading={loading}
            sx={{
              color: "#CC2E89",
            }}
            onClick={() => {
              if (props.evidence[0].name !== "") {
                setLoading(true);
                setPerEvidenceId(props.id);
                setOpenPerEvidence(true);
              }
            }}
          >
            {props.evidence[0].name}
          </LoadingButton>
          <ShowEvidence
            open={openPerEvidence}
            handleClose={handlePerEvidenceClose}
            id={perEvidenceId}
          />
        </>
      );
    }
  };

  const contentComponent = ({
    children,
    appointmentData,
    ...restProps
  }: AppointmentTooltip.ContentProps) => {
    return (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
        children={showEvi(appointmentData)}
      ></AppointmentTooltip.Content>
    );
  };

  return (
    <React.Fragment>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#FCFCFC",
        }}
      >
        <Scheduler data={schedualData} height={"auto"}>
          <ViewState currentDate={currentDate} />

          <DayView startDayHour={9} endDayHour={24} />

          <Appointments />

          <AppointmentTooltip contentComponent={contentComponent} />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
};

export default function ShowDateDetail({
  open,
  handleClose,
  query,
}: detailProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogContent
          sx={{
            bgcolor: "#F5F9FD",
          }}
        >
          <DetailView open={open} handleClose={handleClose} query={query} />
        </DialogContent>

        <DialogActions
          sx={{
            bgcolor: "#F5F9FD",
            // justifyContent: "center",
          }}
        >
          <CustomButtonStyle
            onClick={handleClose}
            variant="contained"
            startIcon={<CancelPresentationIcon />}
          >
            Close
          </CustomButtonStyle>
        </DialogActions>
      </Dialog>
    </div>
  );
}

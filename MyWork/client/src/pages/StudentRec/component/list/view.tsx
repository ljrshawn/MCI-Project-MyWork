import React from "react";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
  AppointmentModel,
  SchedulerDateTime,
  ChangeSet,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  WeekView,
  DayView,
  AppointmentTooltip,
  DragDropProvider,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import { useList, useDelete } from "@pankod/refine-core";

import { ShowAdd } from "./showAdd";
import { LoadingButton } from "@pankod/refine-mui";
import { ShowEvidence } from "pages/component/chartModel/showEvidence";

export default function CusScheduler() {
  const { data, isLoading } = useList({
    resource: "records",
    config: {
      hasPagination: false,
    },
  });

  const { mutate: deleteMutate } = useDelete();

  let id = -1;
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

  if (
    data !== undefined &&
    data?.data.length !== 0 &&
    schedualData.length === 0
  ) {
    setSchedualData(dataIni());
  }

  const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(
    dayjs().format()
  );

  const handleSetSchedualData = (data: any) => {
    if (data !== undefined) {
      return setSchedualData([
        ...schedualData,
        {
          id: data.data.id,
          title: data.data.task,
          startDate: data.data.start,
          endDate: data.data.end,
          evidence: data.data.evidence,
          hour: data.data.hour,
        },
      ]);
    }
  };

  const onCommitChanges = React.useCallback(
    (props: ChangeSet) => {
      const { added, changed, deleted } = props;
      if (added) {
        const startingAddedId = schedualData.length > 0 ? String(id + 1) : "0";
        setSchedualData([
          ...schedualData,
          {
            id: startingAddedId,
            title: added.task,
            startDate: added.start,
            endDate: added.end,
            evidence: added.evidence,
            hour: added.hour,
          },
        ]);
      }
      // if (changed) {
      // }
      if (deleted !== undefined) {
        deleteMutate({
          resource: "records",
          id: deleted,
        });
        setSchedualData(
          schedualData.filter((appointment) => appointment.id !== deleted)
        );
      }
    },
    [schedualData]
  );

  const WeekTimeTableCell = React.useCallback(
    React.memo<WeekView.TimeTableCellProps>(
      ({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
          {...restProps}
          onDoubleClick={handleShowAddClickOpen}
        />
      )
    ),
    []
  );

  const DayTimeTableCell = React.useCallback(
    React.memo<DayView.TimeTableCellProps>(
      ({ onDoubleClick, ...restProps }) => (
        <DayView.TimeTableCell
          {...restProps}
          onDoubleClick={handleShowAddClickOpen}
        />
      )
    ),
    []
  );

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

  const [openShowAdd, setOpenShowAdd] = React.useState(false);
  const [openShowData, setShowData] = React.useState(undefined);

  const [showAddId, setShowAddId] = React.useState("");
  const [nameShowAdd, setNameShowAdd] = React.useState("");

  const handleShowAddClickOpen = (data: any) => {
    setShowData(data);
    setOpenShowAdd(true);
  };

  const handleShowAddClose = () => {
    setOpenShowAdd(false);
  };

  const headerComponent = ({
    appointmentData,
    onOpenButtonClick,
    ...restProps
  }: AppointmentTooltip.HeaderProps) => (
    <AppointmentTooltip.Header
      {...restProps}
      onOpenButtonClick={() => handleShowAddClickOpen(appointmentData)}
    />
  );

  return (
    <React.Fragment>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#FCFCFC",
        }}
      >
        <Scheduler data={schedualData} height={700}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={(currentDate) => setCurrentDate(currentDate)}
          />
          <EditingState onCommitChanges={onCommitChanges} />

          <IntegratedEditing />
          <WeekView
            startDayHour={9}
            endDayHour={24}
            timeTableCellComponent={WeekTimeTableCell}
          />

          <DayView
            startDayHour={9}
            endDayHour={24}
            timeTableCellComponent={DayTimeTableCell}
          />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />

          <ConfirmationDialog ignoreCancel />
          <Appointments />

          <AppointmentTooltip
            // showOpenButton
            showDeleteButton
            contentComponent={contentComponent}
            headerComponent={headerComponent}
          />

          <ShowAdd
            open={openShowAdd}
            handleClose={handleShowAddClose}
            oriData={openShowData}
            handleData={handleSetSchedualData}
          />

          <DragDropProvider />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
}

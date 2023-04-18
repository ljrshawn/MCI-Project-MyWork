import React from "react";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

// import {
//   ViewState,
//   EditingState,
//   IntegratedEditing,
//   AppointmentModel,
//   SchedulerDateTime,
//   ChangeSet,
// } from "@devexpress/dx-react-scheduler";
// import {
//   Scheduler,
//   Toolbar,
//   DateNavigator,
//   Appointments,
//   TodayButton,
//   ViewSwitcher,
//   WeekView,
//   DayView,
//   AppointmentForm,
//   AppointmentTooltip,
//   DragDropProvider,
// } from "@devexpress/dx-react-scheduler-material-ui";

// import { useDataGrid } from "@pankod/refine-mui";

// export default function CusScheduler() {
//   const { dataGridProps } = useDataGrid({
//     hasPagination: false,
//   });

//   let id = -1;
//   const dataIni = () => {
//     const DI: Array<AppointmentModel> = [];
//     if (
//       dataGridProps &&
//       dataGridProps.rows &&
//       dataGridProps.rows.length !== 0
//     ) {
//       dataGridProps.rows.forEach((el) => {
//         let d: AppointmentModel = {
//           title: el.task,
//           startDate: el.start,
//           endDate: el.end,
//           id: ++id,
//         };

//         DI.push(d);
//       });
//     }
//     return DI;
//   };

//   const [data, setData] = React.useState<Array<AppointmentModel>>(dataIni());
//   console.log(data);

//   const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(
//     dayjs().format()
//   );
//   console.log(currentDate);

//   const [addedAppointment, setAddedAppointment] = React.useState({});

//   const onCommitChanges = React.useCallback(
//     (props: ChangeSet) => {
//       const { added, changed, deleted } = props;
//       if (added) {
//         const startingAddedId = data.length > 0 ? id + 1 : 0;
//         setData([
//           ...data,
//           {
//             id: startingAddedId,
//             title: added.task,
//             startDate: added.start,
//             endDate: added.end,
//           },
//         ]);
//       }
//       if (changed) {
//         setData(
//           data.map((appointment: AppointmentModel) =>
//             appointment.id && changed[appointment.id]
//               ? { ...appointment, ...changed[appointment.id] }
//               : appointment
//           )
//         );
//       }
//       if (deleted !== undefined) {
//         setData(data.filter((appointment) => appointment.id !== deleted));
//       }
//     },
//     [setData, data]
//   );

//   const onAddedAppointmentChange = React.useCallback((appointment: any) => {
//     setAddedAppointment(appointment);
//   }, []);

//   type TimeTableCellProps = {
//     onDoubleClick: () => void;
//   };

//   const TimeTableCell = React.useCallback(
//     React.memo<TimeTableCellProps>(({ onDoubleClick, ...restProps }) => (
//       <WeekView.TimeTableCell {...restProps} onDoubleClick={onDoubleClick} />
//     )),
//     []
//   );

//   // const CommandButton = React.useCallback(
//   //   ({ id, ...restProps }: { id: any }) => {
//   //     if (id === "deleteButton") {
//   //       return <AppointmentForm commandButtonComponent={id={id} {...restProps}}  />;
//   //     }
//   //     return <AppointmentForm.CommandButtonProps id={id} {...restProps} />;
//   //   },
//   //   []
//   // );

//   return (
//     <React.Fragment>
//       <Paper>
//         <Scheduler data={data} height={600}>
//           <ViewState
//             currentDate={currentDate}
//             onCurrentDateChange={(currentDate) => setCurrentDate(currentDate)}
//           />
//           <EditingState
//             onCommitChanges={onCommitChanges}
//             addedAppointment={addedAppointment}
//             onAddedAppointmentChange={onAddedAppointmentChange}
//           />

//           <IntegratedEditing />
//           <WeekView
//             startDayHour={9}
//             endDayHour={24}
//             // timeTableCellComponent={TimeTableCell}
//           />

//           <DayView
//             startDayHour={9}
//             endDayHour={24}
//             // timeTableCellComponent={TimeTableCell}
//           />
//           <Toolbar />
//           <ViewSwitcher />
//           <DateNavigator />
//           <TodayButton />
//           <Appointments />

//           <AppointmentTooltip showOpenButton />
//           <AppointmentForm
//           // commandButtonComponent={CommandButton}
//           />
//           <DragDropProvider />
//         </Scheduler>
//       </Paper>
//     </React.Fragment>
//   );
// }

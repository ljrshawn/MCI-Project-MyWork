import React from "react";
import { Typography, CardHeader } from "@mui/material";
import { Box } from "@pankod/refine-mui";

import { PerRecords } from "./personalRecord";
import { TeamRecords } from "./teamRecords";
import { CustomButton } from "pages/component/button/newPageButton";
import { ShowTeamMember } from "../component/chartModel/showTeamMember";
import ShowDateDetail from "pages/component/chartModel/showDateDetail";

export const StudentHome = () => {
  const [openDateDetail, setOpenDateDetail] = React.useState(false);

  const [dateDetailQuery, setDateDetailQuery] = React.useState<{
    userId: string;
    year: string;
    month: string;
    date: string;
  }>({ userId: "", year: "", month: "", date: "" });

  const handleDateDetailOpen = (event: any, elements: any, chart: any) => {
    setDateDetailQuery({
      userId: elements[0].element.$context.raw.userId,
      year: elements[0].element.$context.raw.year,
      month: elements[0].element.$context.raw.month,
      date: elements[0].element.$context.raw.date,
    });

    setOpenDateDetail(true);
  };

  const handleDateDetailClose = () => {
    setOpenDateDetail(false);
  };

  const [openTeamMember, setOpenTeamMember] = React.useState(false);

  const [teamMemberId, setTeamMemberId] = React.useState("");
  const [nameTeamMember, setNameTeamMember] = React.useState("");

  const handleTeamMemberClickOpen = (event: any, elements: any, chart: any) => {
    setTeamMemberId(elements[0].element.$context.raw.id);
    setNameTeamMember(elements[0].element.$context.raw.name);

    setOpenTeamMember(true);
  };

  const handleTeamMemberClose = () => {
    setOpenTeamMember(false);
  };

  return (
    <>
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={<Typography variant="h5">DashBoard</Typography>}
        action={
          <Box display="flex" gap="16px">
            <CustomButton url="/records" value="Add New" />
          </Box>
        }
      />

      <PerRecords
        resource="stu_records"
        title="My Workload"
        handleClickOpen={handleDateDetailOpen}
      />
      <ShowDateDetail
        open={openDateDetail}
        handleClose={handleDateDetailClose}
        query={dateDetailQuery}
      />
      <TeamRecords
        open={openTeamMember}
        handleClickOpen={handleTeamMemberClickOpen}
        handleClose={handleTeamMemberClose}
      />
      <ShowTeamMember
        open={openTeamMember}
        handleClose={handleTeamMemberClose}
        id={teamMemberId}
        name={nameTeamMember}
      />
    </>
  );
};

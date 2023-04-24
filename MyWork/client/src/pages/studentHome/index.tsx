import React from "react";
import { Typography, CardHeader } from "@mui/material";
import { Box } from "@pankod/refine-mui";

import { PerRecords } from "./personalRecord";
import { TeamRecords } from "./teamRecords";
import { CustomButton } from "pages/component/button/newPageButton";
import { ShowTeamMember } from "./showTeamMember";
import { ShowEvidence } from "./showEvidence";

export const StudentHome = () => {
  const [openPerEvidence, setOpenPerEvidence] = React.useState(false);

  const [perEvidenceId, setPerEvidenceId] = React.useState("");

  const handlePerEvidenceClickOpen = (
    event: any,
    elements: any,
    chart: any
  ) => {
    setPerEvidenceId(elements[0].element.$context.raw.id);

    setOpenPerEvidence(true);
  };

  const handlePerEvidenceClose = () => {
    setOpenPerEvidence(false);
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
        handleClickOpen={handlePerEvidenceClickOpen}
      />
      <ShowEvidence
        open={openPerEvidence}
        handleClose={handlePerEvidenceClose}
        id={perEvidenceId}
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

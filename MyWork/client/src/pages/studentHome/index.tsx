import React from "react";
import { Typography, CardHeader } from "@mui/material";
import { Box } from "@pankod/refine-mui";

import { PerRecords } from "./personalRecord";
import { TeamRecords } from "./teamRecords";
import { CustomButton } from "pages/component/button/newPageButton";
import { ShowTeamMember } from "./showTeamMember";

export const StudentHome = () => {
  const [openTeamMember, setOpenTeamMember] = React.useState(false);

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");

  const handleClickOpen = (event: any, elements: any, chart: any) => {
    setId(elements[0].element.$context.raw.id);
    setName(elements[0].element.$context.raw.name);

    setOpenTeamMember(true);
  };

  const handleClose = () => {
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

      <PerRecords resource="stu_records" title="My Workload" />
      <TeamRecords
        open={openTeamMember}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <ShowTeamMember
        open={openTeamMember}
        handleClose={handleClose}
        id={id}
        name={name}
      />
    </>
  );
};

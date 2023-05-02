import * as React from "react";
import { useList } from "@pankod/refine-core";

import { Card, ListItem, Paper } from "@mui/material";

import { FixedSizeList, ListChildComponentProps } from "react-window";
import PiChart from "./piChartModel";
import { ShowTeamMember } from "pages/component/chartModel/showTeamMember";
import { ShowTeam } from "pages/component/chartModel/showTeam";

export default function VirtualizedList() {
  const { data, isLoading } = useList({
    resource: "manage/teamNumber",
    config: {
      hasPagination: false,
    },
  });

  const itemCount = () => {
    if (data !== undefined) {
      return data?.data.length;
    } else {
      return 0;
    }
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

  const [openTeam, setOpenTeam] = React.useState(false);

  const [teamNumber, setTeamNumber] = React.useState("");

  const handleTeamClickOpen = (e: any) => {
    setTeamNumber(e);
    setOpenTeam(true);
  };

  const handleTeamClose = () => {
    setOpenTeam(false);
  };

  function renderCol(props: ListChildComponentProps) {
    const { index, style } = props;

    if (data !== undefined) {
      return (
        <ListItem
          style={{ ...style, justifyContent: "center" }}
          key={index}
          component="div"
          disablePadding
        >
          <PiChart
            data={data?.data[index]}
            open={openTeamMember}
            handleClickOpen={handleTeamMemberClickOpen}
            detailOpen={openTeam}
            handleDetailOpen={handleTeamClickOpen}
          />
        </ListItem>
      );
    } else {
      return <></>;
    }
  }

  const width = () => {
    const wd = document.getElementById("mainField")?.offsetWidth || 1000;

    return wd - 100;
  };

  return (
    <>
      <Card
        id="mainField"
        sx={{
          backgroundColor: "#FCFCFC",
          width: "100%",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#FCFCFC",
            width: width(),
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <FixedSizeList
            height={600}
            width={width()}
            itemSize={600}
            itemCount={itemCount()}
            overscanCount={5}
            layout="horizontal"
          >
            {renderCol}
          </FixedSizeList>
          <ShowTeamMember
            open={openTeamMember}
            handleClose={handleTeamMemberClose}
            id={teamMemberId}
            name={nameTeamMember}
          />
          <ShowTeam
            detailOpen={openTeam}
            handleDetailOpen={handleTeamClickOpen}
            handleDetailClose={handleTeamClose}
            number={teamNumber}
          />
        </Paper>
      </Card>
    </>
  );
}

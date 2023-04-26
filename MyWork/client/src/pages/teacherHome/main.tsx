import * as React from "react";
import { useList } from "@pankod/refine-core";

import { Card, ListItem } from "@mui/material";

import { FixedSizeList, ListChildComponentProps } from "react-window";
import PiChart from "./piChartModel";
import { ShowTeamMember } from "pages/component/chartModel/showTeamMember";

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
          />
        </ListItem>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#FCFCFC",
          width: 1000,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <FixedSizeList
          height={600}
          width={1000}
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
      </Card>
    </>
  );
}

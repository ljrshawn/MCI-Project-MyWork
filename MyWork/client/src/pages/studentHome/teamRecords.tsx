import React from "react";
import { Typography, Card, CardHeader, CardContent } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useList } from "@pankod/refine-core";
import { openDialogProps } from "pages/component/interface/form";

ChartJS.register(ArcElement, Tooltip, Legend);

export const TeamRecords = ({
  open,
  handleClickOpen,
  handleClose,
}: openDialogProps) => {
  const { data, isLoading } = useList({
    resource: "stu_records/team",
    config: {
      hasPagination: false,
    },
  });

  const options = {
    aspectRatio: 4,
    parsing: {
      key: "hours",
    },
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
    onClick: handleClickOpen,
  };

  const chartData = {
    labels: data?.data.map((el) => {
      return el.firstName;
    }),
    datasets: [
      {
        label: "Workload",
        data: data?.data.map((el) => {
          if (el.hours) {
            return {
              name: `${el.firstName}`,
              id: `${el.id}`,
              hours: `${el.hours}`,
            };
          } else {
            return {
              name: `${el.firstName}`,
              id: `${el.id}`,
              hours: `0`,
            };
          }
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
      },
    ],
  };

  return (
    <Card
      sx={{
        mt: 2,
        backgroundColor: "#FCFCFC",
      }}
    >
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={<Typography variant="h6">My Team</Typography>}
      />
      <CardContent>
        <Pie options={options} data={chartData} />
      </CardContent>
    </Card>
  );
};

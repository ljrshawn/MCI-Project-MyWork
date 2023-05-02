import * as React from "react";

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  openDialogProps,
  openDetailDialogProps,
} from "pages/component/interface/form";

ChartJS.register(ArcElement, Tooltip, Legend);

interface props extends openDialogProps, openDetailDialogProps {
  data: any;
}

export default function PiChart({
  data,
  open,
  handleClickOpen,
  handleClose,
  detailOpen,
  handleDetailOpen,
}: props) {
  const options = {
    aspectRatio: 1,
    parsing: {
      key: "hours",
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
          useBorderRadius: true,
          borderRadius: 5,
        },
      },
    },
    onClick: handleClickOpen,
  };

  const chartData = {
    labels: data.map((el: any) => {
      return el.firstName;
    }),
    datasets: [
      {
        label: "Workload",
        data: data.map((el: any) => {
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
      variant="outlined"
      sx={{
        backgroundColor: "#FCFCFC",
        height: "100%",
        width: "70%",
      }}
    >
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={
          <Button
            variant="text"
            sx={{
              color: "#2E89CC",
              ":hover": {
                color: "#2E89CC",
                opacity: 0.6,
                backgroundColor: "#E5F0F9",
              },
            }}
            onClick={() => {
              handleDetailOpen(data[0].team);
            }}
          >
            <Typography variant="h6">{`Team ${data[0].team}`}</Typography>
          </Button>
        }
      />
      <CardContent>
        <Pie options={options} data={chartData} />
      </CardContent>
    </Card>
  );
}

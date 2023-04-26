import * as React from "react";

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";

import DetailsIcon from "@mui/icons-material/Details";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { openDialogProps } from "pages/component/interface/form";

ChartJS.register(ArcElement, Tooltip, Legend);

interface props extends openDialogProps {
  data: any;
}

export default function PiChart({
  data,
  open,
  handleClickOpen,
  handleClose,
}: props) {
  const options = {
    aspectRatio: 1,
    parsing: {
      key: "hours",
    },
    plugins: {
      legend: {
        position: "top" as const,
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
        width: "80%",
      }}
    >
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={<Typography variant="h6">{`Team ${data[0].team}`}</Typography>}
        action={
          <IconButton aria-label="Detail" size="small">
            <DetailsIcon
              fontSize="small"
              sx={{
                color: "#A67CDF",
              }}
            />
          </IconButton>
        }
      />
      <CardContent>
        <Pie options={options} data={chartData} />
      </CardContent>
    </Card>
  );
}

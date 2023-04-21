import React from "react";
import { Typography, Card, CardHeader, CardContent } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { personalRecordsProps } from "pages/component/interface/form";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PerRecords = ({ data }: personalRecordsProps) => {
  const options = {
    responsive: true,
    aspectRatio: 4,
    borderRadius: 10,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Hour(s)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        // onClick: (e: any, legendItem: any, legend: any) => {
        //   console.log(e);
        // },
      },
    },
  };

  const labels = [];

  for (let index = 6; index >= 0; index--) {
    const label = new Date(Date.now() - index * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(5, 10);
    labels.push(label);
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Workload",
        data: data?.data.map((el) => {
          return { x: el.fullDate.slice(5), y: el.hour };
        }),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        barPercentage: 0.5,
      },
    ],
  };

  return (
    <Card
      sx={{
        backgroundColor: "#FCFCFC",
      }}
    >
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={<Typography variant="h6">My Workload</Typography>}
      />
      <CardContent>
        <Bar options={options} data={chartData} />
      </CardContent>
    </Card>
  );
};

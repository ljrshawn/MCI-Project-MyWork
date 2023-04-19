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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PerRecords = () => {
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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [200, 300, 400, 500, 600, 700],
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barPercentage: 0.5,
      },
      {
        label: "Dataset 2",
        data: [200, 300, 400, 500, 600, 700, 800],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  );
};

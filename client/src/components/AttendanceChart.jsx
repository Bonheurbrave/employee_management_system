import React from "react";
import { Bar } from "react-chartjs-2";

const AttendanceChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: [90, 85, 95, 80, 88],
        backgroundColor: "#4C51BF",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-lg font-semibold mb-2">Attendance Overview</div>
      <Bar data={data} />
    </div>
  );
};

export default AttendanceChart;

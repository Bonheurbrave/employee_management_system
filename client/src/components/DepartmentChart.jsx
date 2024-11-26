import React from "react";
import { Doughnut } from "react-chartjs-2";

const DepartmentChart = () => {
  const data = {
    labels: ["HR", "Engineering", "Sales", "Finance"],
    datasets: [
      {
        data: [15, 25, 30, 10],
        backgroundColor: ["#63B3ED", "#68D391", "#FC8181", "#F6AD55"],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-lg font-semibold mb-2">Department Breakdown</div>
      <Doughnut data={data} />
    </div>
  );
};

export default DepartmentChart;

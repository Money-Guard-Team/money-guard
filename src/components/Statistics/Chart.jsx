import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data, periodTotal }) => {
  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.length > 0 ? data.map((d) => d.sum) : [1],
        backgroundColor:
          data.length > 0
            ? data.map((d) => d.color)
            : ["rgba(255, 255, 255, 0.1)"],
        borderColor:
          data.length > 0
            ? data.map((d) => d.color)
            : ["rgba(255, 255, 255, 0.1)"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: data.length > 0 },
    },
  };

  return (
    <div className="relative w-[280px] h-[280px] flex justify-center items-center mx-auto md:mx-0">
      <Doughnut data={chartData} options={options} />
      {/* Ortadaki Toplam Tutar */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white font-bold text-lg">
          {Math.abs(periodTotal).toFixed(2)} ₺
        </span>
      </div>
    </div>
  );
};

export default Chart;

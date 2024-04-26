import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart() {
  const data = {
    labels: ["Mon", "Tues", "Wed"],
    datasets: [
      {
        label: "Tom",
        data: [3, 6, 9],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Mike",
        data: [3, 12, 4],
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 14,
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "500px", margin: 0, padding: 0 }}>
      <Bar
        style={{ width: "100%", height: "100%" }}
        data={data}
        options={options}
      />
    </div>
  );
}
export default BarChart;

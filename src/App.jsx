import { Route, Routes } from "react-router-dom";
import BarChart from "./components/BarChart";
import HighchartLine from "./components/LineTest";
import MongoViz from "./components/MongoTest";
import LineChartRace from "./components/LineRace";
import ColumnDrilldown from "./components/ColumnDrilldown";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/bar-chart" element={<BarChart />} />
      <Route path="/line-test" element={<HighchartLine />} />
      <Route path="/mongo-test" element={<MongoViz />} />
      <Route path="/echarts-lineRace" element={<LineChartRace />} />
      <Route path="/column-drilldown" element={<ColumnDrilldown />} />
    </Routes>
  );
}

export default App;

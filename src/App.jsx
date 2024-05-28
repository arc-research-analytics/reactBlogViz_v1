import { Route, Routes } from "react-router-dom";
import HMDAColumnDrilldown from "./components/HMDAColumnDrilldown";
import IRSColumnDrilldown from "./components/IRSColumnDrilldown";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/hmda-column-drilldown" element={<HMDAColumnDrilldown />} />
      <Route path="/irs-column-drilldown" element={<IRSColumnDrilldown />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import HMDAColumnDrilldown from "./components/HMDAColumnDrilldown";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/hmda-column-drilldown" element={<HMDAColumnDrilldown />} />
    </Routes>
  );
}

export default App;

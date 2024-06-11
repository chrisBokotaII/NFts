import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Display from "./pages/Display";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/create" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<Display />} />
      </Routes>
    </div>
  );
};

export default App;

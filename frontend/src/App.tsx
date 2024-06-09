import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Display from "./pages/Display";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/collections" element={<LandingPage />} />
        <Route path="/collections/create" element={<Upload />} />
        <Route path="/collections/dashboard" element={<Dashboard />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<Display />} />
      </Routes>
    </div>
  );
};

export default App;

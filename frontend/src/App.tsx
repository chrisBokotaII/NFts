import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Upload from "./pages/Upload";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/collections" element={<LandingPage />} />
        <Route path="/collections/create" element={<Upload />} />
      </Routes>
    </div>
  );
};

export default App;

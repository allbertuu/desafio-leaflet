import { Routes, Route } from "react-router-dom";
import Form from "./routes/Form";
import MapPage from "./routes/MapPage";

import './App.css';

function App() {
  return (
    <div className="container mx-auto py-10 flex flex-col justify-center h-screen">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;

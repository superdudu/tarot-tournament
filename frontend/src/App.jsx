import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Tournament from "./pages/Tournament.jsx";
import Match from "./pages/Match.jsx";
import Stats from "./pages/Stats.jsx";
import History from "./pages/History.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournament/:id" element={<Tournament />} />
          <Route path="/match/:id/:round" element={<Match />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
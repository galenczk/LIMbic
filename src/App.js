import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
// Components

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <div className="sticky top-0 z-50">
          <header className="bg-slate-800 text-white p-2">
            Enviro Lab - Analytical Laboratory Database Management Suite
          </header>
        </div>
        <main className="flex flex-col flex-grow">
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
          </Routes>
        </main>
        <div>
          <footer className="flex justify-center text-center text-white bg-slate-800 p-0.5">
            <p>Galen Ciszek</p>
            <p> &copy; 2023</p>
          </footer>
        </div>
      </Router>
    </div>
  );
}

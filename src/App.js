import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import AllProjectsPage from "./pages/projects/AllProjectsPage";

// Components
import SideBar from "./components/SideBar";

export default function App() {
    return (
        <div className="">
            <Router>
                <SideBar>
                    <Routes>
                        <Route path="/" exact element={<LandingPage />} />
                        <Route path="/projects" exact element={<AllProjectsPage />} />
                    </Routes>
                </SideBar>
            </Router>
        </div>
    );
}

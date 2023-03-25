import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";

import AllClientsPage from "./pages/clients/AllClientsPage";
import AddClientPage from "./pages/clients/AddClientPage";

import AllManagersPage from "./pages/managers/AllManagersPage";
import AddManagerPage from "./pages/managers/AddManagerPage";

import AllProjectsPage from "./pages/projects/AllProjectsPage";
import AddProjectPage from "./pages/projects/AddProjectPage";
import ProjectDetailsPage from "./pages/projects/ProjectDetailsPage";

import AllTechsPage from "./pages/techs/AllTechsPage";
import AddTechPage from "./pages/techs/AddTechPage";

// Components
import SideBar from "./components/SideBar";

export default function App() {
    return (
        <div className="">
            <Router>
                <SideBar>
                    <Routes>
                        <Route path="/" exact element={<LandingPage />} />

                        <Route path="/clients" exact element={<AllClientsPage />} />
                        <Route path="/add-client" exact element={<AddClientPage />} />

                        <Route path="/managers" exact element={<AllManagersPage />} />
                        <Route path="/add-manager" exact element={<AddManagerPage />} />

                        <Route path="/projects" exact element={<AllProjectsPage />} />
                        <Route path="/add-project" exact element={<AddProjectPage />} />
                        <Route path="/projects/:id_project" exact element={<ProjectDetailsPage />} />

                        <Route path="/techs" exact element={<AllTechsPage />} />
                        <Route path="/add-tech" exact element={<AddTechPage />} />
                    </Routes>
                </SideBar>
            </Router>
        </div>
    );
}

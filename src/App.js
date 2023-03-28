import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";

import AllClientsPage from "./pages/clients/AllClientsPage";
import AddClientPage from "./pages/clients/AddClientPage";
import ClientDetailsPage from "./pages/clients/ClientDetailsPage";

import AllManagersPage from "./pages/managers/AllManagersPage";
import AddManagerPage from "./pages/managers/AddManagerPage";
import EditManagerPage from "./pages/managers/EditManagerPage"

import AllProjectsPage from "./pages/projects/AllProjectsPage";
import AddProjectPage from "./pages/projects/AddProjectPage";
import ProjectDetailsPage from "./pages/projects/ProjectDetailsPage";

import AllTechsPage from "./pages/techs/AllTechsPage";
import AddTechPage from "./pages/techs/AddTechPage";
import EditTechPage from "./pages/techs/EditTechPage";

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
                        <Route path="/clients/add" exact element={<AddClientPage />} />
                        <Route path="/clients/:id_client" exact element={<ClientDetailsPage />} />

                        <Route path="/managers" exact element={<AllManagersPage />} />
                        <Route path="/managers/add" exact element={<AddManagerPage />} />
                        <Route path="/managers/edit/:id_manager" exact element={<EditManagerPage />} />

                        <Route path="/projects" exact element={<AllProjectsPage />} />
                        <Route path="/projects/add" exact element={<AddProjectPage />} />
                        <Route path="/projects/:id_project" exact element={<ProjectDetailsPage />} />

                        <Route path="/techs" exact element={<AllTechsPage />} />
                        <Route path="/techs/add" exact element={<AddTechPage />} />
                        <Route path="/techs/edit/:id_tech" exact element={<EditTechPage />} />
                    </Routes>
                </SideBar>
            </Router>
        </div>
    );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";

import AllClientsPage from "./pages/clients/AllClientsPage";
import AddClientPage from "./pages/clients/AddClientPage";
import EditClientPage from "./pages/clients/EditClientPage";
import ClientDetailsPage from "./pages/clients/ClientDetailsPage";
import EditClientNotes from "./pages/clients/EditClientNotes";

import AllProjectsPage from "./pages/projects/AllProjectsPage";
import AddProjectPage from "./pages/projects/AddProjectPage";
import EditProjectPage from "./pages/projects/EditProjectPage";
import ProjectDetailsPage from "./pages/projects/ProjectDetailsPage";
import EditSamplesPage from "./pages/projects/EditSamplesPage";
import AddResultsPage from "./pages/projects/AddResultsPage";
import CompletedProjectsPage from "./pages/projects/completed/CompletedProjectsPage";

import TrashPage from "./pages/thingsUnseen/TrashPage";

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
            <Route path="/clients/edit/:id_client" exact element={<EditClientPage />} />
            <Route path="/clients/:id_client" exact element={<ClientDetailsPage />} />
            <Route path="/clients/edit-notes/:id_client" exact element={<EditClientNotes />} />

            <Route path="/projects" exact element={<AllProjectsPage />} />
            <Route path="/projects/add" exact element={<AddProjectPage />} />
            <Route path="/projects/edit/:id_project" exact element={<EditProjectPage />} />
            <Route path="/projects/:id_project" exact element={<ProjectDetailsPage />} />
            <Route path="/projects/edit-samples/:id_project" exact element={<EditSamplesPage />} />
            <Route path="/projects/edit-results/:id_project" exact element={<AddResultsPage />} />

            <Route path="/completed" exact element={<CompletedProjectsPage />} />

            <Route path="/trash" exact element={<TrashPage />} />
          </Routes>
        </SideBar>
      </Router>
    </div>
  );
}

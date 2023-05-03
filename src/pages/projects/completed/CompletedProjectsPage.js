import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CompletedProjectsTable from "../../../components/projects/completed/CompletedProjectsTable";

export default function CompletedProjectsPage() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  async function loadProjects() {
    const response = await axios.get("http://localhost:3030/projects/completed");
    const projects = response.data;
    setProjects(projects);
  }

  async function reopen(id_project) {
    const response = await axios.post(`http://localhost:3030/projects/reopen`, { id_project });
    if (response.status === 200) {
      navigate(`/projects/${id_project}`)
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h3 className="text-2xl p-4">Completed Projects</h3>
        </div>

        <div>
          {projects.length ? <CompletedProjectsTable projects={projects} reopen={reopen} /> : (
            <div className="text-center mt-12">
              <p className="text-xl">There are no completed projects at this time.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SampleTable from "../../components/samples/SampleTable";

export default function ProjectDetailsPage() {
    const { id_project } = useParams();

    const [project, setProject] = useState([]);
    const [samples, setSamples] = useState([]);

    async function loadProject(id_project) {
        const response = await axios.get(`http://localhost:3030/projects/${id_project}`);
        const project = response.data[0];
        setProject(project);
    }

    async function loadSamples(id_project) {
        const response = await axios.get(`http://localhost:3030/samples/${id_project}`);
        const samples = response.data;
        setSamples(samples);
    }

    useEffect(() => {
        loadProject(id_project);
        loadSamples(id_project);
    }, []);

    const navigate = useNavigate();

    async function onDelete(id_project) {
        const response = await axios.post(`http://localhost:3030/projects/delete`, {id_project})
        if (response.status === 200){
            navigate("/projects")
        }
    }

    return (
      <div className="flex flex-col m-4 h-full">
        <div className="flex">
          <h2>{project.id_project}</h2>
          <div className="w-24" />
          <h2>{project.project_name}</h2>
          <div className="mx-auto" />
          <h2>{project.id_client}</h2>
          <div className="mx-auto" />
          <button className="btn btn-red" onClick={() => {navigate("/projects")}}>Back</button>
        </div>
        <div className="flex mt-6">
          <h2>{project.project_type}</h2>
          <div className="w-24" />
          <h2 className="">{project.num_samples + " samples"}</h2>
          <div className="w-24" />
          <h2>{project.turn_around_time}</h2>
        </div>
        <div id="samples table" className="mt-8 flex flex-col gap-4">
          <div className="flex m-2">
            <h2>Samples</h2>
            <div className="mx-auto" />
            <button className="btn btn-blue" onClick={() => navigate(`/projects/edit-samples/${project.id_project}`)}>
              Edit Sample Details
            </button>
            <button className="btn btn-blue" onClick={() => navigate(`/projects/edit-results/${project.id_project}`)}>
              Add Sample Results
            </button>
          </div>

          <SampleTable samples={samples} />
          <button className="btn btn-blue mx-auto ml-2">Expand (does nothing yet)</button>
        </div>
        <div id="bottom buttons" className="flex mt-auto">
          <button className="btn btn-blue">Complete Project</button>
          <div className="mx-auto" />

          <button
            className="btn btn-blue"
            onClick={() => {
              navigate(`/projects/edit/${project.id_project}`);
            }}
          >
            Edit Project Details
          </button>
          <div className="w-8" />
          <button className="btn btn-blue" onClick={() => {
            onDelete(project.id_project)
          }}>Delete Project</button>
        </div>
      </div>
    );
}

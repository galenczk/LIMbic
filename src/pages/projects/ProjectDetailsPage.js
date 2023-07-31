import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SampleTable from "../../components/samples/SampleTable";

import ConfirmationModal from "../../components/ConfirmationModal";

export default function ProjectDetailsPage() {
  const { id_project } = useParams();

  const [project, setProject] = useState([]);
  const [samples, setSamples] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDelete = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmDeletion = () => {
    setShowConfirmationModal(false);
    onDelete(id_project);
  };

  const handleCancelDeletion = () => {
    setShowConfirmationModal(false);
  };

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
    const response = await axios.post(`http://localhost:3030/projects/delete`, { id_project });
    if (response.status === 200) {
      navigate("/projects");
    }
  }
  async function onComplete(id_project) {
    const response = await axios.post(`http://localhost:3030/projects/complete`, { id_project });
    if (response.status === 200) {
      navigate("/projects");
    }
  }

  return (
    <div className="flex flex-col flex-grow p-4" id="page">
      <div className="">
        <div className="flex">
          <div className="mr-auto">
            <p className="text-2xl">{project.project_name}</p>
          </div>
          <button
            className="btn my-auto "
            onClick={() => {
              navigate("/projects");
            }}
          >
            Back
          </button>
        </div>
        <div className="flex pt-8">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Type</th>
                <th>Samples</th>
                <th>TAT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{project.id_client}</td>
                <td>{project.project_type}</td>
                <td>{project.num_samples}</td>
                <td>{project.turn_around_time}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="table" className="flex flex-col mt-8 gap-4">
        <div className="flex mt-8">
          <h2 className="text-lg">Samples</h2>
          <div className="mx-auto" />

          <button className="btn btn-blue" onClick={() => navigate(`/projects/edit-results/${project.id_project}`)}>
            Add Analytical Results
          </button>
        </div>

        <SampleTable samples={samples} expanded={expanded} />
        <div className="flex justify-between">
          {(project.num_samples > 8) && <button className="btn mx-auto ml-0" onClick={() => {setExpanded(!expanded)}}>{expanded ? "Collapse" : "Expand"}</button>}
          <button className="btn" onClick={() => navigate(`/projects/edit-samples/${project.id_project}`)}>
            Edit Sample Information
          </button>
        </div>
      </div>
      <div className="flex mt-auto" id="myItem">
        <button
          onClick={() => {
            onComplete(project.id_project);
          }}
          className="btn btn-blue"
        >
          Complete Project
        </button>
        <div className="mx-auto" />

        <button
          className="btn btn-blue"
          onClick={() => {
            navigate(`/projects/edit/${project.id_project}`);
          }}
        >
          Edit Project Details
        </button>
        <div className="w-12" />
        <button
          className="btn btn-blue"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete Project
        </button>

        {showConfirmationModal && (
          <ConfirmationModal
            message="Are you sure you want to delete this project?"
            confirmAction={handleConfirmDeletion}
            cancelAction={handleCancelDeletion}
          />
        )}
      </div>
    </div>
  );
}

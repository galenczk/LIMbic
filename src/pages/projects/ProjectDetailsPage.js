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
    <div className="flex flex-col m-4 h-full">
      <div>
        <div className="flex ">
          <div>
            <p className="text-2xl">{project.project_name}</p>
            <div className="mx-auto" />
            <p className="text-xl mt-2">[client]</p>
          </div>
          <div></div>

          <div className="mx-auto" />

          <button
            className="btn my-auto"
            onClick={() => {
              navigate("/projects");
            }}
          >
            Back
          </button>
        </div>
        <div className="flex mt-6">
          <h2>{project.project_type}</h2>
          <div className="w-24" />
          <h2 className="">{project.num_samples + " samples"}</h2>
          <div className="w-24" />
          <h2>{project.turn_around_time}</h2>
        </div>
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
        <div className="w-8" />
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

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ProjectTableClientPage from "../../components/projects/clientPage/ProjectTableClientPage";

import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function ClientDetailsPage() {
  const { id_client } = useParams();

  const [client, setClient] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDelete = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmDeletion = () => {
    setShowConfirmationModal(false);
    onDelete(id_client);
  };

  const handleCancelDeletion = () => {
    setShowConfirmationModal(false);
  };

  async function loadClient(id_client) {
    const response = await axios.get(`http://localhost:3030/clients/${id_client}`);
    const client = response.data[0];
    setClient(client);
  }

  async function loadProjects(id_client) {
    const response = await axios.get(`http://localhost:3030/projects-for-client/${id_client}`);
    const projects = response.data;
    setProjects(projects);
  }

  async function onDelete(id_client) {
    const response = await axios.post(`http://localhost:3030/clients/delete`, { id_client });
    if (response.status === 200) {
      navigate("/clients");
    }
  }

  useEffect(() => {
    loadClient(id_client);
    loadProjects(id_client);
  }, []);

  const navigate = useNavigate();

  console.log(client);

  return (
    <div className="flex flex-col m-4 h-full">
      <div className="flex ">
        <h2>{client.client_name}</h2>
        <div className="w-24" />
        <h2>{client.client_address}</h2>
        <div className="w-24" />
        <h2>{client.client_phone}</h2>
        <button
          className="btn btn-red"
          onClick={() => {
            navigate("/clients");
          }}
        >
          Back
        </button>
      </div>
      <div>
        <h2>{client.client_type}</h2>
      </div>
      <div className="mt-12">
        <h2>Active Projects</h2>
        <ProjectTableClientPage projects={projects} />
      </div>
      <div className="mt-12">
        <h2>Completed Projects</h2>
        <ProjectTableClientPage projects={projects} />
      </div>

      <div>
        <h2 className="mt-8">Client Notes</h2>
        <div className="w-1/2 h-48 overflow-y-scroll bg-gray-200">
          {client.client_notes ? (
            <div>{client.client_notes}</div>
          ) : (
            <p>There are no notes for this client at this time.</p>
          )}
        </div>
      </div>
      <div id="bottom buttons" className="flex mt-6">
        <button className="btn" onClick={() => navigate(`/clients/edit-notes/${client.id_client}`)}>
          Edit Client Notes
        </button>
        <div className="mx-auto" />

        <button
          className="btn "
          onClick={() => {
            navigate(`/clients/edit/${client.id_client}`);
          }}
        >
          Edit Client Details
        </button>
        <div className="w-8" />
        <button
          className="btn"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete Client
        </button>

        {showConfirmationModal && (
          <DeleteConfirmationModal
            message="Are you sure you want to delete this client?"
            confirmAction={handleConfirmDeletion}
            cancelAction={handleCancelDeletion}
          />
        )}
      </div>
    </div>
  );
}

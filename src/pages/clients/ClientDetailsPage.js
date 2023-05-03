import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ProjectTableClientPage from "../../components/projects/clientPage/ProjectTableClientPage";

export default function ClientDetailsPage() {
  const { id_client } = useParams();

  const [client, setClient] = useState([]);
  const [projects, setProjects] = useState([]);

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

      <div id="bottom buttons" className="flex mt-auto">
        <div className="mx-auto" />

        <button
          className="btn btn-blue"
          onClick={() => {
            navigate(`/clients/edit/${client.id_client}`);
          }}
        >
          Edit Client Details
        </button>
        <div className="w-8" />
        <button
          className="btn btn-blue"
          onClick={() => {
            onDelete(client.id_client);
          }}
        >
          Delete Client
        </button>
      </div>
    </div>
  );
}

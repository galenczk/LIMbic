import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ProjectTableClientPage from "../../components/projects/ClientPage/ProjectTableClientPage";


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

    useEffect(() => {
        loadClient(id_client);
        loadProjects(id_client)
    }, []);

    const navigate = useNavigate();

    console.log(client)

    return (
        <div className="flex flex-col m-4 h-full">
            <div className="flex ">
                <h2>{client.client_name}</h2>
                <div className="w-24" />
                <h2>{client.client_address}</h2>
                <div className="w-24" />
                <h2>{client.client_phone}</h2>
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
                <button className="btn" onClick={() => {
                    navigate(`/clients/edit/${id_client}`)
                }}>Edit Client Details</button>
            </div> 
        </div>
    );
}

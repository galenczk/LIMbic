import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import ClientTable from "../../components/clients/ClientTable";

export default function AllClientsPage() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate()

    async function loadClients() {
        const response = await axios.get("http://localhost:3030/clients");
        const clients = response.data;
        setClients(clients);
    }

    useEffect(() => {
        loadClients();
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl p-4">Clients</h3>
                <button onClick={() =>{
                    navigate("/add-client")
                }} className="btn btn-green">Add New Client</button>
            </div>

            <ClientTable clients={clients} />
        </>
    );
}

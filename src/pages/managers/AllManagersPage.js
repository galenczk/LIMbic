import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// Components
import ManagerTable from "../../components/managers/ManagerTable";
import { useNavigate } from "react-router-dom";

export default function AllManagersPage() {
    const [managers, setManagers] = useState([]);
    const navigate = useNavigate();

    async function loadManagers() {
        const response = await axios.get("http://localhost:3030/managers");
        const managers = response.data;
        setManagers(managers);
    }

    useEffect(() => {
        loadManagers();
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl p-4">Managers</h3>
                <button
                    onClick={() => {
                        navigate("/add-manager");
                    }}
                    className="btn btn-green"
                >
                    Add New Manager
                </button>
            </div>

            <ManagerTable managers={managers} />
        </>
    );
}

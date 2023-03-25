import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import TechTable from "../../components/techs/TechTable";

export default function AllTechsPage() {
    const [techs, setTechs] = useState([]);

    const navigate = useNavigate()

    async function loadTechs() {
        const response = await axios.get("http://localhost:3030/techs");
        const techs = response.data;
        setTechs(techs);
    }

    useEffect(() => {
        loadTechs();
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl p-4">Techs</h3>
                <button onClick={() => {
                    navigate("/add-tech")
                }} className="btn btn-green">Add New</button>
            </div>

            <TechTable techs={techs} />
        </>
    );
}

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import TechTable from "../../components/techs/TechTable";

export default function AllTechsPage() {
  const [techs, setTechs] = useState([]);

  const navigate = useNavigate();

  async function loadTechs() {
    const response = await axios.get("http://localhost:3030/techs");
    const techs = response.data;
    setTechs(techs);
  }

  useEffect(() => {
    loadTechs();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between">
        <h3 className="text-2xl p-4">Technicians</h3>
        <button
          onClick={() => {
            navigate("/techs/add");
          }}
          className="btn btn-green"
        >
          Add New Tech
        </button>
      </div>
      <div>
        {techs.length ? <TechTable techs={techs} /> : (
          <div className="text-center mt-12">
            <p className="text-xl">There are no technicians at this time.</p>
          </div>
        )}
      </div>
      
      
    </div>
  );
}

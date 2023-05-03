import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import EntityTable from "../components/EntityTable";

export default function AllEntitiesPage({ name, url, columns }) {
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();

  async function loadEntities() {
    const response = await axios.get(`http://localhost:3030/${url}`);
    const entities = response.data;
    setEntities(entities);
  }

  async function onView(id_entity) {
    navigate(`/${url}/${id_entity}`);
  }

  useEffect(() => {
    loadEntities();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h3 className="text-2xl p-4">{name.charAt(0).toUpperCase().slice(1)}</h3>
          <button
            onClick={() => {
              navigate(`/${url}/add`);
            }}
            className="btn btn-green"
          >
            Open New {name}
          </button>
        </div>

        <div>
          {entities.length ? (
            <EntityTable entities={entities} columns={columns} onView={onView} />
          ) : (
            <div className="text-center mt-12">
              <p className="text-xl">There are no {name.toLowerCase()} at this time.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

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

    console.log(name);

    return (
        <>
            <div id="page">
                <div className="flex justify-between p-4">
                    <h3 className="text-2xl">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </h3>

                    {name == "clients" ? (
                        <button
                            onClick={() => {
                                navigate(`/${url}/add`);
                            }}
                            className="btn my-auto">
                            Add New {name.slice(0, -1)}
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                navigate(`/${url}/add`);
                            }}
                            className="btn my-auto">
                            Open New {name.slice(0, -1)}
                        </button>
                    )}
                </div>

                <div className="p-4">
                    {entities.length ? (
                        <EntityTable
                            entities={entities}
                            columns={columns}
                            onView={onView}
                        />
                    ) : (
                        <div className="text-center mt-12">
                            <p className="text-xl">
                                There are no {name.toLowerCase()} at this time.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

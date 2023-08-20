import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SampleTable from "../../components/samples/SampleTable";

import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import CompleteConfirmationModal from "../../components/CompleteConfirmationModal";

export default function ProjectDetailsPage() {
    const { id_project } = useParams();

    const [project, setProject] = useState([]);
    const [samples, setSamples] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [clients, setClients] = useState([])
    const [thisClient, setThisClient] = useState('')

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showCompleteConfirmation, setShowCompleteConfirmation] = useState(false);

    // Handle delete confirmation modal
    const handleDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDeletion = () => {
        setShowDeleteConfirmation(false);
        onDelete(id_project);
    };

    const handleCancelDeletion = () => {
        setShowDeleteConfirmation(false);
    };

    // Handle complete confirmation modal
    const handleComplete = () => {
        setShowCompleteConfirmation(true);
    };

    const handleConfirmComplete = () => {
        setShowCompleteConfirmation(false);
        onComplete(id_project);
    };

    const handleCancelComplete = () => {
        setShowCompleteConfirmation(false);
    };

    async function loadProject(id_project) {
        const response = await axios.get(
            `http://localhost:3030/projects/${id_project}`
        );
        const project = response.data[0];
        setProject(project);
    }

    async function loadSamples(id_project) {
        const response = await axios.get(
            `http://localhost:3030/samples/${id_project}`
        );
        const samples = response.data;
        setSamples(samples);
    }

    useEffect(() => {
        loadProject(id_project);
        loadSamples(id_project);
    }, []);

    const navigate = useNavigate();

    async function onDelete(id_project) {
        const response = await axios.post(
            `http://localhost:3030/projects/delete`,
            { id_project }
        );
        if (response.status === 200) {
            navigate("/projects");
        }
    }
    async function onComplete(id_project) {
        const response = await axios.post(
            `http://localhost:3030/projects/complete`,
            { id_project }
        );
        if (response.status === 200) {
            navigate("/projects");
        }
    }

    return (
        <div className="flex flex-col flex-grow p-4" id="page">
            <div className="">
                <div className="flex">
                    <div className="mr-auto">
                        <p className="text-2xl">{project.project_name}</p>
                    </div>
                    <button
                        className="btn my-auto "
                        onClick={() => {
                            navigate("/projects");
                        }}>
                        Back
                    </button>
                </div>
                <div className="flex pt-8">
                    <table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Type</th>
                                <th>Samples</th>
                                <th>TAT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{thisClient}</td>
                                <td>{project.project_type}</td>
                                <td>{project.num_samples}</td>
                                <td>{project.turn_around_time}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="table" className="flex flex-col mt-8 gap-4">
                <div className="flex mt-8">
                    <h2 className="text-lg">Samples</h2>
                    <div className="mx-auto" />

                    <button
                        className="btn btn-blue"
                        onClick={() =>
                            navigate(
                                `/projects/edit-results/${project.id_project}`
                            )
                        }>
                        Add/Edit Analytical Results
                    </button>
                </div>

                <SampleTable samples={samples} expanded={expanded} />
                <div className="flex justify-between">
                    {project.num_samples > 8 && (
                        <button
                            className="btn mx-auto ml-0"
                            onClick={() => {
                                setExpanded(!expanded);
                            }}>
                            {expanded ? "Collapse" : "Expand"}
                        </button>
                    )}
                    <button
                        className="btn"
                        onClick={() =>
                            navigate(
                                `/projects/edit-samples/${project.id_project}`
                            )
                        }>
                        Edit Sample Information
                    </button>
                </div>
            </div>
            <div className="flex mt-auto" id="myItem">
                <button
                    onClick={() => {
                        handleComplete();
                    }}
                    className="btn btn-blue">
                    Complete Project
                </button>
                <div className="mx-auto" />

                <button
                    className="btn btn-blue"
                    onClick={() => {
                        navigate(`/projects/edit/${project.id_project}`);
                    }}>
                    Edit Project Details
                </button>
                <div className="w-12" />
                <button
                    className="btn btn-blue"
                    onClick={() => {
                        handleDelete();
                    }}>
                    Delete Project
                </button>

                {showDeleteConfirmation && (
                    <DeleteConfirmationModal
                        message="Are you sure you want to delete this project?"
                        confirmAction={handleConfirmDeletion}
                        cancelAction={handleCancelDeletion}
                    />
                )}
                {showCompleteConfirmation && (
                    <CompleteConfirmationModal
                        message="Set this project as completed?"
                        confirmAction={handleComplete}
                        cancelAction={handleCancelComplete}
                    />
                )}
            </div>
        </div>
    );
}

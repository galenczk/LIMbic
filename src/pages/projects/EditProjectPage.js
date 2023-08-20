// Import dependencies
import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

export default function EditProjectPage(name) {
    const navigate = useNavigate();

    const { id_project } = useParams();

    const [project, setProject] = useState({});
    const [clients, setClients] = useState([]);
    const [thisClient, setThisClient] = useState('');

    async function loadProject(id_project) {
        const response = await axios.get(
            `http://localhost:3030/projects/${id_project}`
        );
        const project = response.data[0];
        setProject(project);
    }

    async function loadClients() {
        const response = await axios.get("http://localhost:3030/clients");
        const clients = response.data;
        setClients(clients);
    }

    async function loadThisClient(id_client) {
        const response = await axios.get(
            `http://localhost:3030/clients/${id_client}`
        );
        const client = response.data[0];
        console.log(client)
        setThisClient(client)
    }

    useEffect(() => {
        loadProject(id_project);
        loadThisClient(project.id_client);
        loadClients();
    }, []);

    // DOM return
    return (
        <>
            <div className="flex flex-col w-1/2 mx-auto my-6">
                <h1 className="text-3xl p-6"> Edit Project Details</h1>

                <div className="flex w-full place-self-center">
                    <div
                        id="Existing Information"
                        className="p-8 bg-gray-300 mx-auto w-1/2 flex flex-col">
                        <h1 className="text-xl">Current Information</h1>
                        <div className="h-6" />
                        <div className="">
                            <h2 className="font-bold">Client</h2>
                            <p>{thisClient}</p>
                        </div>
                        <div className="mt-2">
                            <h2 className="font-bold">Project Name</h2>
                            <p>{project.project_name}</p>
                        </div>
                        <div className="mt-2">
                            <h2 className="font-bold">
                                Client's Project Number
                            </h2>
                            <p>{project.project_num_client}</p>
                        </div>
                        <div className="mt-2">
                            <h2 className="font-bold">Number of Samples</h2>
                            <p>{project.num_samples}</p>
                        </div>
                        <div className="mt-2">
                            <h2 className="font-bold">Turn Around Time</h2>
                            <p>{project.turn_around_time}</p>
                        </div>
                        <div className="mt-2">
                            <h2 className="font-bold">Project Type</h2>
                            <p>{project.project_type}</p>
                        </div>
                        <div className="flex-grow" />
                        <div className="">
                            <button
                                className="btn btn-blue"
                                type="reset"
                                onClick={() => {
                                    navigate(
                                        `/projects/${project.id_project}`
                                    );
                                }}>
                                Back
                            </button>
                        </div>
                    </div>
                    <div
                        id="edit tech form"
                        className="p-8 bg-gray-300 mx-auto w-1/2">
                        <div>
                            <h1 className="text-xl">New Information</h1>
                        </div>

                        <div className="h-4" />

                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                id_project: project.id_project,
                                id_client: project.id_client,
                                project_name: project.project_name,
                                project_num_client: project.project_num_client,
                                num_samples: project.num_samples,
                                turn_around_time: project.turn_around_time,
                                project_type: project.project_type,
                            }}
                            onSubmit={async (values) => {
                                const response = await axios.post(
                                    "http://localhost:3030/projects/update",
                                    values
                                );
                                if (response.status === 200) {
                                    navigate(`/projects/${id_project}`);
                                }
                            }}>
                            <Form class="flex flex-col">
                                <label for="id_client">Client</label>
                                <Field
                                    as="select"
                                    id="id_client"
                                    name="id_client">
                                    <option value="">Select a client</option>
                                    {clients.map((client) => (
                                        <option
                                            key={client.id_client}
                                            value={client.id_client}>
                                            {client.client_name}
                                        </option>
                                    ))}
                                </Field>
                                <label for="project_name">Project Name</label>
                                <Field
                                    type="text"
                                    id="project_name"
                                    name="project_name"
                                />
                                <label for="project_num_client">
                                    Client Project Number
                                </label>
                                <Field
                                    type="text"
                                    id="project_num_client"
                                    name="project_num_client"
                                />
                                <label for="num_samples">
                                    Number of Samples
                                </label>
                                <Field
                                    type="text"
                                    id="num_samples"
                                    name="num_samples"
                                />
                                <label for="turn_around_time">
                                    Turn Around Time
                                </label>
                                <Field
                                    type="text"
                                    id="turn_around_time"
                                    name="turn_around_time"
                                />
                                <label for="project_type">Project Type</label>
                                <Field
                                    type="text"
                                    id="project_type"
                                    name="project_type"
                                />

                                <div class="flex justify-between mt-6">
                                    <button
                                        class="btn-small btn-gray"
                                        type="reset">
                                        Reset
                                    </button>
                                    <button
                                        class="btn btn-green"
                                        type="submit">
                                        Update
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

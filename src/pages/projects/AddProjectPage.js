import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddProjectPage() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    async function loadClients() {
        const response = await axios.get("http://localhost:3030/clients");
        const clients = response.data;
        setClients(clients);
    }

    async function createSamples(values) {
        const response = await axios.post("http://localhost:3030/samples", values)
        if (response.status === 201){
            navigate(`/projects/edit-samples/${values.id_project}`);
            // Navigate to sample editing page.
        }
    }

    async function onAdd(values) {
        const response = await axios.post("http://localhost:3030/projects", values);
        if (response.status === 201) {
            
            values.id_project = response.data[0].id_project
            
            if(values.num_samples > 0){
                createSamples(values) 
            } else{  navigate(`/projects/${values.id_project}`) }
            
        }
    }

    useEffect(() => {
        loadClients();
    }, []);

    return (
        <>
            <h1 className="text-3xl p-6 text-center">New Project</h1>

            <div className="p-8 bg-gray-300 mx-auto w-1/2">
                <Formik
                    initialValues={{
                        project_name: "",
                        project_type: "",
                        project_num_client: "",
                        num_samples: "",
                        turn_around_time: "",
                        id_client: 1,
                    }}
                    onSubmit={async (values) => {
                        onAdd(values);
                    }}
                >
                    <Form className="flex flex-col">
                        <label for="id_client">Client</label>
                        <Field type="text" id="id_client" name="id_client" ></Field>
                        <label for="project_name">Project Name</label>
                        <Field type="text" id="project_name" name="project_name"></Field>
                        <label for="project_type">Project Type</label>
                        <Field as="select" id="project_type" name="project_type">
                            <option value="">-</option>
                            <option value="asbestos">Asbestos</option>
                            <option value="lead">Lead</option>
                            <option value="soil">Soil</option>
                            <option value="water">Water</option>
                            <option value="air">Air</option>
                        </Field>
                        <label for="project_num_client">Client's Project Number</label>
                        <Field type="text" id="project_num_client" name="project_num_client"></Field>
                        <label for="num_samples">Number of Samples</label>
                        <Field type="text" id="num_samples" name="num_samples"></Field>

                        <label for="turn_around_time">Turn Around Time</label>
                        <Field as="select" id="turn_around_time" name="turn_around_time">
                            <option value=""> - </option>
                            <option value="1-2 hrs">1-2 Hours</option>
                            <option value="24 hrs">24 Hours</option>
                            <option value="48 hrs">48 Hours</option>
                            <option value="3 day">3 Day</option>
                            <option value="5 day">5 Day</option>
                            <option value="special">Special</option>
                        </Field>
                        <div className="mt-4">
                            <button className="btn btn-green" type="submit">
                                Add Samples
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

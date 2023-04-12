// Import dependencies
import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

export default function EditTechPage() {
    const navigate = useNavigate();

    const { id_tech } = useParams();

    const [tech, setTech] = useState({});

    async function loadTech(id_tech) {
        const response = await axios.get(`http://localhost:3030/techs/${id_tech}`);
        const tech = response.data[0];
        setTech(tech);
    }

    useEffect(() => {
        loadTech(id_tech);
    }, []);

    // DOM return
    return (
        <>
            <h1 class="text-3xl p-6 text-center"> Edit Technician Details</h1>

            <div class="flex w-2/3 place-self-center">
                <div id="Existing Information" class="p-8 bg-gray-300 mx-auto w-1/2 flex flex-col">
                    <h1 class="text-xl text-center">Current Information</h1>
                    <div class="h-12" />
                    <table class="text-left">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <div class="w-24" />
                                <td>{tech.tech_name}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>Phone</th>
                                <div class="w-24" />
                                <td>{tech.tech_phone}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <div class="w-24" />
                                <td>{tech.tech_email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex-grow" />
                    <div class="">
                        <button
                            class="btn btn-blue"
                            type="reset"
                            onClick={() => {
                                navigate("/techs");
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
                <div id="edit tech form" class="p-8 bg-gray-300 mx-auto w-1/2">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            id_tech: tech.id_tech,
                            tech_name: tech.tech_name,
                            tech_phone: tech.tech_phone,
                            tech_email: tech.tech_email,
                        }}
                        onSubmit={async (values) => {
                            const response = await axios.post("http://localhost:3030/techs/update", values);
                            if (response.status === 200) {
                                navigate("/techs");
                            }
                        }}
                    >
                        <Form class="flex flex-col">
                            <label for="tech_name">Name</label>
                            <Field type="text" id="tech_name" name="tech_name" />
                            <label for="tech_phone">Phone Number</label>
                            <Field type="text" id="tech_phone" name="tech_phone" />
                            <label for="tech_email">Email</label>
                            <Field type="text" id="tech_email" name="tech_email" />
                            <div class="flex justify-between mt-6">
                                <button class="btn-small btn-gray" type="reset">
                                    Reset
                                </button>
                                <button class="btn btn-green" type="submit">
                                    Update
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}

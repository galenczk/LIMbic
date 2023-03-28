// Import dependencies
import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

export default function EditManagerPage() {
    const navigate = useNavigate();

    const { id_manager } = useParams();

    const [manager, setManager] = useState({});

    async function loadManager(id_manager) {
        const response = await axios.get(`http://localhost:3030/managers/${id_manager}`);
        const manager = response.data[0];
        setManager(manager);
    }

    useEffect(() => {
        loadManager(id_manager);
    }, []);

    // DOM return
    return (
        <>
            <h1 class="text-3xl p-6 text-center"> Edit Manager Details</h1>

            <div class="flex w-2/3 place-self-center">
                <div id="Existing Information" class="p-8 bg-gray-300 mx-auto w-1/2 flex flex-col">
                    <h1 class="text-xl text-center">Current Information</h1>
                    <div class="h-12" />
                    <table class="text-left">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <div class="w-24" />
                                <td>{manager.manager_name}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>Phone</th>
                                <div class="w-24" />
                                <td>{manager.manager_phone}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <div class="w-24" />
                                <td>{manager.manager_email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex-grow" />
                    <div class="">
                        <button
                            class="btn btn-blue"
                            type="reset"
                            onClick={() => {
                                navigate("/managers");
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
                <div id="edit manager form" class="p-8 bg-gray-300 mx-auto w-1/2">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            id_manager: manager.id_manager,
                            manager_name: manager.manager_name,
                            manager_phone: manager.manager_phone,
                            manager_email: manager.manager_email,
                        }}
                        onSubmit={async (values) => {
                            const response = await axios.post("http://localhost:3030/managers/update", values);
                            if (response.status === 200) {
                                navigate("/managers");
                            }
                        }}
                    >
                        <Form class="flex flex-col">
                            <label for="manager_name">Name</label>
                            <Field type="text" id="manager_name" name="manager_name" />
                            <label for="manager_phone">Phone Number</label>
                            <Field type="text" id="manager_phone" name="manager_phone" />
                            <label for="manager_email">Email</label>
                            <Field type="text" id="manager_email" name="manager_email" />
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

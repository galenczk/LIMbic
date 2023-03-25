import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddManagerPage() {
    const navigate = useNavigate();

    async function onAdd(values) {
        const response = await axios.post("http://localhost:3030/managers", values);
        if (response.status === 201) {
            navigate("/managers");
        }
    }

    return (
        <>
            <h1 className="text-3xl p-6 text-center">Add a Manager</h1>

            <div className="p-8 bg-gray-300 mx-auto w-1/2">
                <Formik
                    initialValues={{
                        manager_name: "",
                        manager_phone: "",
                        manager_email: "",
                    }}
                    onSubmit={async (values) => {
                        onAdd(values);
                    }}
                >
                    <Form className="flex flex-col">
                        <label for="manager_name">Name</label>
                        <Field type="text" id="manager_name" name="manager_name"></Field>
                        <label for="manager_phone">Phone Number</label>
                        <Field type="text" id="manager_phone" name="manager_phone"></Field>
                        <label for="manager_email">Email</label>
                        <Field type="text" id="manager_email" name="manager_email"></Field>

                        <div className="mt-4">
                            <button className="btn btn-green" type="submit">
                                Add
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

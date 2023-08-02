import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddClientPage() {
    const navigate = useNavigate();

    async function onAdd(values) {
        const response = await axios.post("http://localhost:3030/clients", values);
        if (response.status === 201) {
            navigate("/clients");
        }
    }

    return (
        <>
        <div className="flex flex-col w-1/2 mx-auto my-6">
            <h1 className="text-3xl p-6">New Client</h1>

            <div className="p-8 bg-gray-300 mx-auto w-full">
                <Formik
                    initialValues={{
                        client_name: "",
                        client_address: "",
                        client_phone: "",
                        client_email: "",
                        client_type: "",
                        client_notes: "",
                    }}
                    onSubmit={async (values) => {
                        onAdd(values);
                    }}
                >
                    <Form className="flex flex-col">
                        <label for="client_name">Name</label>
                        <Field type="text" id="client_name" name="client_name"></Field>
                        <label for="client_address">Address</label>
                        <Field type="text" id="client_address" name="client_address"></Field>
                        <label for="client_phone">Phone Number</label>
                        <Field type="text" id="client_phone" name="client_phone"></Field>
                        <label for="client_email">Email</label>
                        <Field type="text" id="client_email" name="client_email"></Field>
                        <label for="client_type">Client Type</label>
                        <Field as="select" id="client_type" name="client_type">
                            <option value=""> - </option>
                            <option value="business">Business</option>
                            <option value="individual">Individual</option>
                            <option value="government">Government</option>
                        </Field>
                        <label for="client_notes">Client Notes</label>
                        <Field type="text" id="client_notes" name="client_notes"></Field>

                        <div className="mt-4 text-end">
                            <button className="btn btn-green" type="submit">
                                Add Client
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
            
        </>
    );
}

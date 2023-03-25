import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddTechPage() {
    const navigate = useNavigate();

    async function onAdd(values) {
        const response = await axios.post("http://localhost:3030/techs", values);
        if (response.status === 201) {
            navigate("/techs");
        }
    }

    return (
        <>
            <h1 className="text-3xl p-6 text-center">Add a Technician</h1>

            <div className="p-8 bg-gray-300 mx-auto w-1/2">
                <Formik
                    initialValues={{
                        tech_name: "",
                        tech_phone: "",
                        tech_email: "",
                    }}
                    onSubmit={async (values) => {
                        onAdd(values);
                    }}
                >
                    <Form className="flex flex-col">
                        <label for="tech_name">Name</label>
                        <Field type="text" id="tech_name" name="tech_name"></Field>
                        <label for="tech_phone">Phone Number</label>
                        <Field type="text" id="tech_phone" name="tech_phone"></Field>
                        <label for="tech_email">Email</label>
                        <Field type="text" id="tech_email" name="tech_email"></Field>

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

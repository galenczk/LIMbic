import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EditSampleLine from "./EditSampleLine";

export default function EditSampleTable({ samples }) {
    const navigate = useNavigate();

    async function onUpdate(values) {
        const response = await axios.post("http://localhost:3030/samples/update", values);
        if (response.status === 201) {
            navigate("/clients");
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    sample_label: "",
                    date_collected: "",
                    sample_medium: "",
                    sample_quantity: "",
                    sample_quantity_unit: "",
                    sample_notes: "",
                }}
                onSubmit={async (values) => {
                    onUpdate(values);
                }}
            >
                <Form>
                    <table>
                        <thead>
                            <tr>
                                <th>Sample ID</th>
                                <th>Label</th>
                                <th>Date Collected</th>
                                <th>Medium</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {samples.map((sample, i) => (
                                <EditSampleLine sample={sample} key={i} />
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button type="submit" className="btn btn-blue">Update</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

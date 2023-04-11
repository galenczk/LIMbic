import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EditSampleLine from "./EditSampleLine";

export default function EditSampleTable({ samples, initialSamples }) {
    const navigate = useNavigate();


    return (
        <>
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
                            {samples.map((sample, index) => (
                                <EditSampleLine sample={sample} key={index} id={index} />
                            ))}
                        </tbody>
                    </table>

                    <div>
                        <button className="btn btn-blue" type="submit">
                            Update
                        </button>
                    </div>
                </Form>
        </>
    );
}

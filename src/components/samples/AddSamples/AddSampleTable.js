import React from "react";
import AddSampleLine from "./AddSampleLine";
import { Formik, Form } from "formik";

export default function AddSampleTable({ num_of_samples }) {
    return (
        <>
            <table className="justify-center">
                <thead>
                    <tr className="">
                        <th className="w-1/12">Sample No.</th>
                        <th className="w-1/4">Project</th>
                        <th className="">Date Collected</th>
                        <th className="w-1/12">Medium</th>
                        <th className="">Quantity</th>
                        <th className="">Result</th>
                        <th className="w-1/4">Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <Formik>
                        <Form>
                            {}
                        </Form>
                    </Formik>
                </tbody>
            </table>
        </>
    );
}

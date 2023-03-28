import React from "react";
import { Formik, Field, Form } from "formik";


export default function AddSampleLine({ sample }) {
    return (
        <>
            <Formik>
                <Form>
                    <label for="sample_label">Sample Label</label>
                    <Field type="text" label="sample_label"></Field>
                    <label for="date_collected">Date Collected</label>
                    <Field></Field>
                    <label for="sample_medium">Medium</label>
                    <Field></Field>
                    <label for="sample_quantity">Quantity</label>
                    <Field></Field>
                </Form>
            </Formik>
        </>
    );
}

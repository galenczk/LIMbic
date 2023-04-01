import React from "react";
import { Formik, Field, Form } from "formik";

export default function EditSampleLine({ sample }) {
    return (
        <>
            <tr>
                <td>{sample.id_sample}</td>
                <td>
                    <Field type="text" id="sample_label" name="sample_label"></Field>
                </td>
                <td>
                    <Field type="text" id="date_collected" name="date_collected"></Field>
                </td>
                <td>
                    <Field type="text" id="sample_medium" name="sample_medium"></Field>
                </td>
                <td>
                    <Field type="text" id="sample_quantity" name="sample_quantity"></Field>
                </td>
                <td>
                    <Field as="select" id="sample_quantity_unit" name="sample_quantity_unit">
                        <option value=""> - </option>
                        <option value="unit 1">unit 1</option>
                        <option value="unit 2">unit 2</option>
                        <option value="unit 3">unit 3</option>
                    </Field>
                </td>
                <td>
                    <Field type="text" id="sample_notes" name="sample_notes"></Field>
                </td>
            </tr>
        </>
    );
}

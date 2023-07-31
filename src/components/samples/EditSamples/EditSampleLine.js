import React from "react";
import { Formik, Field, Form } from "formik";

export default function EditSampleLine({ sample, id, }) {

    return (
        <>
            <tr>
                <td>
                    <h2>{sample.id_sample}</h2>
                </td>
                <td>
                    <Field type="text" name={`sample_label[${id}]`} />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`date_collected[${id}]`}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_medium[${id}]`}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_quantity[${id}]`}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_quantity_unit[${id}]`}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_notes[${id}]`}
                    />
                </td>
            </tr>
        </>
    );
}

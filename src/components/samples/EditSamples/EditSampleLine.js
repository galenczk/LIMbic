import React from "react";
import { Formik, Field, Form } from "formik";

export default function EditSampleLine({ sample, id, disabledFields }) {

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
                        disabled={disabledFields[0]}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_medium[${id}]`}
                        disabled={disabledFields[1]}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_quantity[${id}]`}
                        disabled={disabledFields[2]}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_quantity_unit[${id}]`}
                        disabled={disabledFields[3]}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_notes[${id}]`}
                        disabled={disabledFields[4]}
                    />
                </td>
            </tr>
        </>
    );
}

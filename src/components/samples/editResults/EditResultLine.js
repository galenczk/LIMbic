import React from "react";
import { Formik, Field, Form } from "formik";

export default function EditResultLine({ sample, id, disabledFields }) {

    return (
        <>
            <tr>
                <td>
                    <h2>{sample.id_sample}</h2>
                </td>
                <td>{sample.sample_label}</td>
                <td>{sample.date_collected}</td>
                <td>{sample.sample_medium}</td>
                <td>
                    <Field
                        type="text"
                        name={`sample_result[${id}]`}
                        disabled={disabledFields[0]}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_result_unit[${id}]`}
                        disabled={disabledFields[1]}
                    />
                </td>
                <td>
                    <Field
                        type="text"
                        name={`sample_notes[${id}]`}
                        disabled={disabledFields[2]}
                    />
                </td>
            </tr>
        </>
    );
}

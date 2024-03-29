import React from "react";

export default function Sample({ sample, id }) {
    return (
        <>
            <tr className="text-center">
                <td>{sample.id_sample}</td>
                <td>{sample.sample_label}</td>
                <td>{sample.date_collected}</td>
                <td>{sample.sample_medium}</td>
                <td>
                    {sample.sample_quantity} {sample.sample_quantity_unit}
                </td>
                <td>
                    {sample.sample_result}
                    {sample.sample_result_unit}
                </td>
                <td>{sample.sample_notes}</td>
            </tr>
        </>
    );
}

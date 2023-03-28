import React from "react";
import Sample from "./Sample";

export default function SampleTable({ samples }) {
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
                    {samples.map((sample, i) => (
                        <Sample sample={sample} key={i} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

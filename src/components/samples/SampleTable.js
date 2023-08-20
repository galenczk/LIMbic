import React from "react";
import Sample from "./Sample";

export default function SampleTable({ samples, expanded }) {
    return (
        <>
            <div
                className={` ${
                    expanded
                        ? `justify-center`
                        : `justify-center max-h-96 overflow-auto`
                }`}>
                <table className="">
                    <thead >
                        <tr>
                            <th className="w-1/12">
                                Sample No.
                            </th>
                            <th >Label</th>
                            <th className="w-1/12">Date Collected</th>
                            <th className="w-1/12">Medium</th>
                            <th >Quantity</th>
                            <th >Result</th>
                            <th className="w-1/4">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {samples.map((sample, i) => (
                            <Sample sample={sample} key={i} index={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

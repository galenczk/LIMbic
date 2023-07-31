import React from "react";
import Sample from "./Sample";

export default function SampleTable({ samples, expanded }) {
    return (
      <>
        <div className={` ${expanded ? `justify-center` : `justify-center max-h-96 overflow-auto`}`}>
          <table className="">
            <thead className="">
              <tr className="sticky top-0">
                <th className="w-1/12">Sample No.</th>
                <th className="">Date Collected</th>
                <th className="w-1/12">Medium</th>
                <th className="">Quantity</th>
                <th className="">Result</th>
                <th className="w-1/4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample, i) => (
                <Sample sample={sample} key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
}

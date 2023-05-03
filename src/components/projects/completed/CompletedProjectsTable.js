import React from "react";
import { VscDebugStepBack } from "react-icons/vsc";


export default function CompletedProjectsTable({ projects, reopen }) {
  return (
    <>
      <table className="justify-center">
        <thead>
          <tr className="">
            <th>Reopen</th>
            <th className="">No.</th>
            <th className="w-1/4">Client</th>
            <th className="w-1/4">Manager</th>
            <th className="">Tech</th>
            <th className="">Client's Proj. No.</th>
            <th className="">Name</th>
            <th className="">No. Samples</th>
            <th className="">TAT</th>
            <th className="">Type</th>
            <th className="">Completed On</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            return (
              <tr key={index}>
                <td className="text-center">
                  <button
                    onClick={() => {
                      reopen(project.id_project);
                    }}
                  >{<VscDebugStepBack  className="text-emerald-600"/>}</button>
                </td>
                {Object.values(project).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

import React from "react";
import Project from "./Project";

export default function ProjectTable({ projects }) {
    return (
        <>
            <table className="justify-center">
                <thead>
                    <tr className="">
                        <th className="">ID</th>
                        <th className="w-1/4">Client</th>
                        <th className="w-1/4">Name</th>
                        <th className="">Sample Quantity</th>
                        <th className="">TAT</th>
                        <th className="">Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, i) => (
                        <Project project={project} key={i} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

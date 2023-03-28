import React from "react";
import ProjectClientPage from "./ProjectClientPage";

export default function ProjectTableClientPage({ projects}) {
    return (
        <>
            <table className="justify-center">
                <thead>
                    <tr className="">
                        <th className="">No.</th>
                        <th className="w-1/4">Client</th>
                        <th className="w-1/4">Name</th>
                        <th className="">Type</th>
                        <th className="">Sample Quantity</th>
                        <th className="">TAT</th>
                        <th className="">Technician</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, i) => (
                        <ProjectClientPage project={project} key={i} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

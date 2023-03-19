import React from "react";

export default function Project({ project }) {
    return (
        <>
            <tr className="text-center">
                <td>{project.id_project}</td>
                <td>{project.id_client}</td>
                <td>{project.project_name}</td>
                <td>{project.num_samples}</td>
                <td>{project.turn_around_time}</td>
                <td>{project.id_technician}</td>
            </tr>
        </>
    );
}

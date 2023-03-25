import React from "react";

export default function Project({ project, onView }) {
    return (
        <>
            <tr className="text-center">
                <td>{project.id_project}</td>
                <td>{project.id_client}</td>
                <td>{project.project_name}</td>
                <td>{project.project_type}</td>
                <td>{project.num_samples}</td>
                <td>{project.turn_around_time}</td>
                <td>{project.id_technician}</td>
                <td><button
                    onClick={() => {
                        onView(project.id_project)
                    }}
                    className="btn btn-green"
                >View</button></td>
            </tr>
        </>
    );
}

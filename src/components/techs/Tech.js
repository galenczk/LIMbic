import React from "react";

export default function Tech({ tech }) {
    return (
        <>
            <tr className="text-center">
                <td>{tech.id_tech}</td>
                <td>{tech.tech_name}</td>
                
            </tr>
        </>
    );
}

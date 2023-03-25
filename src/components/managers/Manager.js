import React from "react";

export default function Manager({ manager }) {
    return (
        <>
            <tr className="text-center">
                <td>{manager.id_manager}</td>
                <td>{manager.manager_name}</td>
                
            </tr>
        </>
    );
}

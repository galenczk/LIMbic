import React from "react";

export default function Client({ client }) {
    return (
        <>
            <tr className="text-center">
                <td>{client.id_client}</td>
                <td>{client.client_name}</td>
                
            </tr>
        </>
    );
}

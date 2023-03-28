import React from "react";

export default function Client({ client, onView }) {
    return (
        <>
            <tr className="text-center">
                <td>{client.client_name}</td>
                <td>{client.client_phone}</td>
                <td>{client.client_type}</td>
                <td>{client.client_phone}</td>
                <td><button className="btn btn-green" onClick={() => {
                    onView(client.id_client)
                }}>View</button></td>
            </tr>
        </>
    );
}

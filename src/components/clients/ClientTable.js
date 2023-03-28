import React from "react";
import Client from "./Client";

export default function ClientTable({ clients, onView }) {
    return (
        <>
            <table className="justify-center">
                <thead>
                    <tr className="">
                        <th className="">Name</th>
                        <th className="">Phone</th>
                        <th className="">Type</th>
                        <th className="">No. Active Projects</th>
                        <th className=""></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, i) => (
                        <Client client={client} key={i} onView={onView} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

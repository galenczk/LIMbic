import React from "react";
import Client from "./Client";

export default function ClientTable({ clients }) {
    return (
        <>
            <table className="justify-center">
                <thead>
                    <tr className="">
                        <th className="">1</th>
                        <th className="w-1/4">2</th>
                        <th className="w-1/4">3</th>
                        <th className="">4</th>
                        <th className="">5</th>
                        <th className="">6</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, i) => (
                        <Client client={client} key={i} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

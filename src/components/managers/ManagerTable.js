import React from "react";
import Manager from "./Manager";

export default function ManagerTable({ managers }) {
    return (
        <>
            <table className="justify-center">
                <thead>
                    <tr className="">
                        <th className="">Name</th>
                        <th className="w-1/4">Phone</th>
                        <th className="w-1/4">Email</th>
                        <th className=""></th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map((manager, i) => (
                        <Manager manager={manager} key={i} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

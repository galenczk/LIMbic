import React from "react";
import Manager from "./Manager";

export default function ManagerTable({ managers }) {
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
                    {managers.map((manager, i) => (
                        <Manager manager={manager} key={i} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

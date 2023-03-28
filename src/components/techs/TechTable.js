import React from "react";
import Tech from "./Tech";

export default function TechTable({ techs }) {
    return (
        <>
            <table className="justify-center">
                <thead>
                    <tr className="">
                        <th className="">Name</th>
                        <th className="">Phone</th>
                        <th className="">Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {techs.map((tech, i) => (
                        <Tech tech={tech} key={i} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

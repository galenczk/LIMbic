import React from "react";
import Tech from "./Tech";

export default function TechTable({ techs }) {
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
                    {techs.map((tech, i) => (
                        <Tech tech={tech} key={i} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

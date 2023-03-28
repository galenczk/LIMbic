import React from "react";
import { useNavigate } from "react-router-dom";

export default function Tech({ tech }) {
    const navigate = useNavigate();

    return (
        <>
            <tr className="text-center">
                <td>{tech.tech_name}</td>
                <td>{tech.tech_phone}</td>
                <td>{tech.tech_email}</td>
                <td>
                    <button
                        className="btn btn-blue"
                        onClick={() => {
                            navigate(`/techs/edit/${tech.id_tech}`);
                        }}
                    >
                        Edit
                    </button>
                </td>
            </tr>
        </>
    );
}

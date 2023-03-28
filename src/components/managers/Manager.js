import React from "react";
import { useNavigate } from "react-router-dom";

export default function Manager({ manager }) {
    const navigate = useNavigate()
    return (
        <>
            <tr className="text-center">
                <td>{manager.manager_name}</td>
                <td>{manager.manager_phone}</td>
                <td>{manager.manager_email}</td>
                <td><button onClick={() => {
                    navigate(`/managers/edit/${manager.id_manager}`)
                }} className="btn btn-blue">Edit</button></td>
                
            </tr>
        </>
    );
}

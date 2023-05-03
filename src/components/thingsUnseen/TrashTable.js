import React from "react";


import { FaTrashRestoreAlt } from "react-icons/fa";

export default function TrashTable({ data, columns, type, restoreItem }) {
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Restore</th>
            {columns.map((value, key) => {
              return <th key={key}>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="text-center">
                <button
                  onClick={() => {
                    type === 1
                      ? restoreItem(row.id_project, type)
                      : type === 2
                      ? restoreItem(row.id_client, type)
                      : restoreItem(row.id_tech, type);
                  }}
                >
                  {<FaTrashRestoreAlt className="text-emerald-600" />}
                </button>
              </td>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

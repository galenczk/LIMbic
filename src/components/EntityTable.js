import React from "react";

export default function EntityTable({ entities, columns, onView }) {
  return (
    <>
      <table className="justify-center">
        <thead>
          <tr className="">
            {columns.map((column, i) => (
              <th key={i} className="">
                {column.Header}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, i) => (
            <tr key={i} className="">
              {Object.values(entity).map((value, j) => (
                <td key={j} className="">
                  {value}
                </td>
              ))}
              <td className="">
                <button onClick={() => onView(entity[Object.keys(entity)[0]])} className="btn" >View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

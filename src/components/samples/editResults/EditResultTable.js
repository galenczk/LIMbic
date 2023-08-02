import React, { useState, useEffect } from "react";
import { Formik, Form, useField } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EditSampleLine from "./EditResultLine";

export default function EditResultTable({
    samples,
    initialSamples,
    setSamples,
}) {
    const navigate = useNavigate();

    async function setAllColsSame(columnName, firstValue) {
        const updatedSamples = samples.map((sample) => ({
            ...sample,
            [columnName]: firstValue,
        }));
        console.log(updatedSamples)
        setSamples(updatedSamples);
    }

    const firstResult = useField("sample_result[0]");
    const firstUnit = useField("sample_result_unit[0]");
    const firstNotes = useField("sample_notes[0]");

    //console.log(firstResult)

    const [lockResult, setLockResult] = useState(false);
    const [lockUnit, setLockUnit] = useState(false);
    const [lockNotes, setLockNotes] = useState(false);

    let disabledFields = [
        lockResult, 
        lockUnit,
        lockNotes,
    ];

    function lockButton(columnName) {
        if (columnName == "sample_result") {
            setLockResult(!lockResult);
        }
        if (columnName == "sample_result_unit") {
            setLockUnit(!lockUnit);
        }
        if (columnName == "sample_notes") {
            setLockNotes(!lockNotes);
        }
    }

    useEffect(() => {}, [disabledFields]);

    return (
        <div className="p-4">
            <Form>
                <table>
                    <thead>
                        <tr>
                            <th>Sample ID</th>
                            <th>Label</th>
                            <th>Date Collected</th>
                            <th>Sample Medium</th>
                            <th>
                                Result
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAllColsSame(
                                                "sample_result",
                                                firstResult[0].value
                                            );
                                            if (!lockResult) {
                                                lockButton("sample_result");
                                            }
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            lockButton("sample_result");
                                        }}
                                        className={
                                            lockResult
                                                ? "btn-small"
                                                : "btn-small btn-grey"
                                        }
                                        type="button">
                                        Lock
                                    </button>
                                </div>
                            </th>
                            <th>
                                Unit
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAllColsSame(
                                                "sample_result_unit",
                                                firstUnit[0].value
                                            );
                                            if (!lockUnit) {
                                                lockButton(
                                                    "sample_result_unit"
                                                );
                                            }
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            lockButton("sample_result_unit");
                                        }}
                                        className={
                                            lockUnit
                                                ? "btn-small"
                                                : "btn-small btn-grey"
                                        }
                                        type="button">
                                        Lock
                                    </button>
                                </div>
                            </th>
                            <th>
                                Notes
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAllColsSame(
                                                "sample_notes",
                                                firstNotes[0].value
                                            );
                                            if (!lockNotes) {
                                                lockButton("sample_notes");
                                            }
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            lockButton("sample_notes");
                                        }}
                                        className={
                                            lockNotes
                                                ? "btn-small"
                                                : "btn-small btn-grey"
                                        }
                                        type="button">
                                        Lock
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {samples.map((sample, index) => (
                            <EditSampleLine
                                sample={sample}
                                key={index}
                                id={index}
                                disabledFields={disabledFields}
                            />
                        ))}
                    </tbody>
                </table>

                <div className="flex">
                    <button className="btn ml-auto mt-4" type="submit">
                        Update
                    </button>
                </div>
            </Form>
        </div>
    );
}

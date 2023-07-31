import React, { useState, useEffect } from "react";
import { Formik, Form, useField } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EditSampleLine from "./EditSampleLine";

export default function EditSampleTable({
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
        setSamples(updatedSamples);
    }

    const firstDate = useField("date_collected[0]");
    const firstMedium = useField("sample_medium[0]");
    const firstQuantity = useField("sample_quantity[0]");
    const firstUnit = useField("sample_quantity_unit[0]");
    const firstNotes = useField("sample_notes[0]");

    const [lockDateCollected, setLockDateCollected] = useState(false);
    const [lockMedium, setLockMedium] = useState(false);
    const [lockQuantity, setLockQuantity] = useState(false);
    const [lockUnit, setLockUnit] = useState(false);
    const [lockNotes, setLockNotes] = useState(false);

    let disabledFields = [
        lockDateCollected,
        lockMedium,
        lockQuantity,
        lockUnit,
        lockNotes,
    ];

    function lockButton(columnName) {
        if (columnName == "date_collected") {
            setLockDateCollected(!lockDateCollected);
        }
        if (columnName == "sample_medium") {
            setLockMedium(!lockMedium);
        }
        if (columnName == "sample_quantity") {
            setLockQuantity(!lockQuantity);
        }
        if (columnName == "sample_quantity_unit") {
            setLockUnit(!lockUnit);
        }
        if (columnName == "sample_notes") {
            setLockNotes(!lockNotes);
        }
    }

    //useEffect(() => {
    //}, [disabledFields])

    console.log(disabledFields)

    return (
        <div className="p-4">
            <Form>
                <table>
                    <thead>
                        <tr>
                            <th className="text-center text-xl">Sample ID</th>
                            <th className="text-center text-xl">Label</th>
                            <th className="text-center text-xl">
                                Date Collected
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAllColsSame(
                                                "date_collected",
                                                firstDate[0].value
                                            );
                                            if (!lockDateCollected) {
                                                lockButton("date_collected");
                                            }
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            lockButton("date_collected");
                                        }}
                                        className={
                                            lockDateCollected
                                                ? "btn-small"
                                                : "btn-small btn-grey"
                                        }
                                        type="button">
                                        Lock
                                    </button>
                                </div>
                            </th>
                            <th className="text-center text-xl">
                                Medium
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAllColsSame(
                                                "sample_medium",
                                                firstMedium[0].value
                                            );
                                            if (!lockMedium) {
                                                lockButton("sample_medium");
                                            }
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            lockButton("sample_medium");
                                        }}
                                        className={
                                            lockMedium
                                                ? "btn-small"
                                                : "btn-small btn-grey"
                                        }
                                        type="button">
                                        Lock
                                    </button>
                                </div>
                            </th>
                            <th className="text-center text-xl">
                                Quantity
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAllColsSame(
                                                "sample_quantity",
                                                firstQuantity[0].value
                                            );
                                            if (!lockQuantity) {
                                                lockButton("sample_quantity");
                                            }
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            lockButton("sample_quantity");
                                        }}
                                        className={
                                            lockQuantity
                                                ? "btn-small"
                                                : "btn-small btn-grey"
                                        }
                                        type="button">
                                        Lock
                                    </button>
                                </div>
                            </th>
                            <th className="text-center text-xl">
                                Unit
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAllColsSame(
                                                "sample_quantity_unit",
                                                firstUnit[0].value
                                            );
                                            if (!lockUnit) {
                                                lockButton(
                                                    "sample_quantity_unit"
                                                );
                                            }
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            lockButton("sample_quantity_unit");
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
                            <th className="text-center text-xl">
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

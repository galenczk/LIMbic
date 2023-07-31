import React, { useState, useEffect } from "react";
import { Formik, Form, useField } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EditSampleLine from "./EditSampleLine";

export default function EditSampleTable({
    samples,
    initialSamples,
    setSamples
}) {
    const navigate = useNavigate();


    //const [firstDateCollected, setFirstDateCollected] = useState("");
    //const [firstMedium, setFirstMedium] = useState("");
    //const [firstQuantity, setFirstQuantity] = useState("");
    //const [firstUnit, setFirstUnit] = useState("");
    //const [firstNote, setFirstNote] = useState("");

    //useEffect(() => {
    //    // Check if samples array is not empty and then set the first values
    //    if (samples.length > 0) {
    //
    //        setFirstDateCollected(samples[0]?.date_collected || "");
    //        setFirstMedium(samples[0]?.sample_medium || "");
    //        setFirstQuantity(samples[0]?.sample_quantity || "");
    //        setFirstUnit(samples[0]?.sample_unit || "");
    //        setFirstNote(samples[0]?.sample_notes || "");
    //    }
    //}, [samples]);

    async function SetAllColsSame(columnName, firstValue) {

        const updatedSamples = samples.map((sample) => ({
            ...sample,
            [columnName]: firstValue,
        }));
        setSamples(updatedSamples);
    }

    const firstDate = useField("date_collected[0]")
    const firstMedium = useField("sample_medium[0]")
    const firstQuantity = useField("sample_quantity[0]")
    const firstUnit = useField("sample_quantity_unit[0]")
    const firstNotes = useField("sample_notes[0]")

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
                                            SetAllColsSame(
                                                "date_collected",
                                                firstDate[0].value
                                            );
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                            </th>
                            <th className="text-center text-xl">
                                Medium
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            SetAllColsSame(
                                                "sample_medium",
                                                firstMedium[0].value
                                            );
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                            </th>
                            <th className="text-center text-xl">
                                Quantity
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            SetAllColsSame(
                                                "sample_quantity",
                                                firstQuantity[0].value
                                            );
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                            </th>
                            <th className="text-center text-xl">
                                Unit
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            SetAllColsSame(
                                                "sample_quantity_unit",
                                                firstUnit[0].value
                                            );
                                        }}>
                                        Uniform
                                    </button>
                                </div>
                            </th>
                            <th className="text-center text-xl">
                                Notes
                                <div className="mx-auto btn-small w-1/3 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            SetAllColsSame(
                                                "sample_notes",
                                                firstNotes[0].value
                                            );
                                        }}>
                                        Uniform
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

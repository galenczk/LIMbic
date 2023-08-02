import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, FieldArray, Field } from "formik";

import EditSampleTable from "../../components/samples/editResults/EditResultTable";

export default function AddResultsPage() {
    const { id_project } = useParams();

    const [project, setProject] = useState([]);
    const [samples, setSamples] = useState([]);

    async function loadProject(id_project) {
        const response = await axios.get(
            `http://localhost:3030/projects/${id_project}`
        );
        const project = response.data[0];
        setProject(project);
    }

    async function loadSamples(id_project) {
        const response = await axios.get(
            `http://localhost:3030/samples/${id_project}`
        );
        const samples = response.data;
        setSamples(samples);
    }

    useEffect(() => {
        loadProject(id_project);
        loadSamples(id_project);
    }, []);

    const navigate = useNavigate();

    // This needs to contain nulls for everything to start.
    const initialSamples = {
        id_project: id_project,
        id_sample: [],
        sample_result: [],
        sample_result_unit: [],
        sample_notes: [],
    };

    // This needs to be changed to set values at specific indexes in the arrays above
    samples.map((sample, index) => {
        initialSamples.id_sample.push(sample.id_sample);
        initialSamples.sample_result.push(sample.sample_result);
        initialSamples.sample_result_unit.push(sample.sample_result_unit);
        initialSamples.sample_notes.push(sample.sample_notes);
    });

    async function onUpdate(values) {
        const response = await axios.post(
            "http://localhost:3030/samples/results/update",
            values
        );
        //if (response.status === 201) {
        //    navigate("/clients");
        //}
    }

    return (
        <div id="page">
            <div className="flex flex-col p-4">
                <h2 className="text-2xl mb-4">Edit Result Information</h2>
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg mb-4">
                            {project.project_name}
                        </h2>
                        <h2 className="text-lg">
                            Project number: {project.id_project}
                        </h2>
                    </div>

                    <button
                        className="btn my-auto"
                        onClick={() => {
                            navigate(`/projects/${initialSamples.id_project}`);
                        }}>
                        Back
                    </button>
                </div>
            </div>
            <div className="">
                <Formik
                    initialValues={initialSamples}
                    onSubmit={async (values) => {
                        onUpdate(values);
                    }}
                    enableReinitialize={true}>
                    <EditSampleTable
                        samples={samples}
                        initialSamples={initialSamples}
                        setSamples={setSamples}
                    />
                </Formik>
            </div>
        </div>
    );
}

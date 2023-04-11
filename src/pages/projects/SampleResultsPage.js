import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, FieldArray, Field } from "formik";

import EditSampleTable from "../../components/samples/EditSamples/EditSampleTable";

export default function SampleResultsPage() {
    const { id_project } = useParams();

    const [project, setProject] = useState([]);
    const [samples, setSamples] = useState([]);

    async function loadProject(id_project) {
        const response = await axios.get(`http://localhost:3030/projects/${id_project}`);
        const project = response.data[0];
        setProject(project);
    }

    async function loadSamples(id_project) {
        const response = await axios.get(`http://localhost:3030/samples/${id_project}`);
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
        sample_notes: []
    };

    // This needs to be changed to set values at specific indexes in the arrays above
    samples.map((sample, index) => {
        initialSamples.id_sample.push(sample.id_sample);
        initialSamples.sample_result.push(sample.sample_result);
        initialSamples.sample_result_unit.push(sample.sample_result_unit);
        initialSamples.sample_notes.push(sample.sample_notes);
    });

    async function onUpdate(values) {
        const response = await axios.post("http://localhost:3030/samples/results/update", values);
        //if (response.status === 201) {
        //    navigate("/clients");
        //}
    }

    return (
        <div>
            <div>
                <h2>Project Number: {project.id_project}</h2>
                <div className="w-24" />
                <h2>Project Name: {project.project_name}</h2>
                <div className="mx-auto" />
            </div>
            <div className="mt-12 bg-red-300">
                <Formik
                    initialValues={initialSamples}
                    onSubmit={async (values) => {
                        onUpdate(values);
                    }}
                    enableReinitialize={true}
                >
                    <EditSampleTable samples={samples} initialSamples={initialSamples} />
                </Formik>
            </div>
        </div>
    );
}

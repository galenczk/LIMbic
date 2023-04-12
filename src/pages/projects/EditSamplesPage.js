import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, FieldArray, Field } from "formik";

import EditSampleTable from "../../components/samples/editSamples/EditSampleTable";

export default function EditSamplesPage() {
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
        date_collected: [],
        sample_label: [],
        sample_medium: [],
        sample_quantity: [],
        sample_quantity_unit: [],
        sample_notes: [],
    };

    // This needs to be changed to set values at specific indexes in the arrays above
    samples.map((sample, index) => {
        initialSamples.id_sample.push(sample.id_sample);
        initialSamples.date_collected.push(sample.date_collected);
        initialSamples.sample_label.push(sample.sample_label);
        initialSamples.sample_medium.push(sample.sample_medium);
        initialSamples.sample_quantity.push(sample.sample_quantity);
        initialSamples.sample_quantity_unit.push(sample.sample_quantity_unit);
        initialSamples.sample_notes.push(sample.sample_notes);
    });

    async function onUpdate(values) {
        const response = await axios.post("http://localhost:3030/samples/update", values);
        if (response.status === 200) {
            navigate(`/projects/${initialSamples.id_project}`);
        }
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

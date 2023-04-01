import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import EditSampleTable from "../../components/samples/AddSamples/EditSampleTable"

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
        loadSamples(id_project)
    }, []);

    const navigate = useNavigate()
    
    return (
        <div>
            <div>
                <h2>{project.id_project}</h2>
                <div className="w-24" />
                <h2>{project.project_name}</h2>
                <div className="mx-auto" />
            </div>
            <div className='mt-12 bg-red-300'>
                <EditSampleTable samples={samples}/>
            </div>
            
        </div>
    );
}

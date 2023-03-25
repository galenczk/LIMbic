import React from "react";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

// Components
import ProjectTable from "../../components/projects/ProjectTable"

export default function AllProjectsPage() {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    async function loadProjects() {
        const response = await axios.get("http://localhost:3030/projects");
        const projects = response.data
        setProjects(projects)
    }

    async function onView(id_project) {
        navigate(`/projects/${id_project}`)
    }

    useEffect(() => {
        loadProjects()
    }, [])

    return (
    <>
        <div className="flex justify-between">
           <h3 className="text-2xl p-4">Projects</h3> 
           <button 
            onClick={() => {navigate("/add-project")}}
           className="btn btn-green">Open New Project</button>
        </div>
        
        
        <ProjectTable projects={projects} onView={onView}/>
        
    </>
    );
}

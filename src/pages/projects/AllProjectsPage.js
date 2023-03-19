import React from "react";
import { useState, useEffect } from "react"
import axios from "axios"

// Components
import ProjectTable from "../../components/projects/ProjectTable"

export default function AllProjectsPage() {
    const [projects, setProjects] = useState([])

    async function loadProjects() {
        const response = await axios.get("http://localhost:3030/projects");
        const projects = response.data
        setProjects(projects)
    }

    useEffect(() => {
        loadProjects()
    }, [])

    return (
    <>
        <h3 className="text-2xl p-4">Projects</h3>
        
        <ProjectTable projects={projects}/>
        
    </>
    );
}

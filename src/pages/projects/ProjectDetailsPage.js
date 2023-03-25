import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProjectDetailsPage() {
    const { id_project } = useParams()

    const [project, setProject] = useState([])

    async function loadProject(id_project){
        const response = await axios.get(`http://localhost:3030/projects/${id_project}`);
        const data = response.data
        const project = data[0]

        setProject(project)
    }

     useEffect(() => {
        loadProject(id_project)
     }, [])

     const navigate = useNavigate()
  
    return (
        <>
            <h2>{project.project_name}</h2>
        </> 
  )
}

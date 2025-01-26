import Link from 'next/link';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/app/api/utils/db';
import DeleteProjectButton from '@/app/components/deleteProjectButton';

interface ProjectPageProps {
    params: { projectId: string };
}

export default async function projectInfoPage({ params }: ProjectPageProps) {
    const { projectId } = await params;
    const project = await getSingleProject(projectId)
    
   return (
        <div>
            <div>
                <h1>{project.number}</h1>
                <h1>{project.name}</h1>
                <h1>{project.client}</h1>
                <h1>{project.type}</h1>
                <h1>{project.numberSamples}</h1>
                <h1>{project.tat}</h1>
            </div>
            <Link href={`/projects/update/${projectId}`}>Edit Project Details</Link>
            <div />
            <Link href={`/projects/dataEntry/${projectId}`}>Enter Analytical Data</Link>
            <div />
            <DeleteProjectButton projectId={projectId} deleteProject={deleteProject}/>
            
        </div>
    );
}

async function getSingleProject(projectId: string){
    const res = await fetch(`http://localhost:3000/api/projects/${projectId}`)
    const data = await res.json()
    return data.project
}

async function deleteProject(projectId: string) {
    'use server';
    const res = fetch(`http:localhost:3000/api/projects/${projectId}`, {
        method: 'DELETE',
    });
}
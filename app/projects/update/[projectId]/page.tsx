import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../api/utils/db';
//import { updateProject } from '../../../api/utils/updateProject';

interface ProjectPageProps {
    params: { projectId: string };
}

export default async function updateProjectPage({ params }: ProjectPageProps) {
    // Get data for single Client based on clientId
    const { projectId } = params;
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return <div>Project not found</div>;
    }
    const project = docSnap.data();

    return (
        <div>
            <form action={updateProject} className='text-black'>
                <input type='text' name='number' defaultValue={project.number} />
                <input type='text' name='name' defaultValue={project.name} />
                <input type='text' name='client' defaultValue={project.client} />
                <input type='text' name='type' defaultValue={project.type} />
                <input type='text' name='numberSamples' defaultValue={project.numberSamples} />
                <input type='text' name='tat' defaultValue={project.tat} />
                <input type='hidden' name='projectId' defaultValue={project.projectId} />
                <button type='submit' className='bg-slate-300 '>
                    Update Client
                </button>
            </form>
        </div>
    );
}

async function updateProject(formData){
    'use server'
    const projectId = formData.get('projectId')
    const project = {
        number: formData.get('number'),
        name: formData.get('name'),
        client: formData.get('client'),
        type: formData.get('type'),
        numberSamples: formData.get('numberSamples'),
        tat: formData.get('tat'),
        projectId: formData.get('projectId'),
    };
    const res = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    })
    const status = await res.json()
    return status
}
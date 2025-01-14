import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../api/utils/db';
import { updateProject } from '../../../api/utils/updateProject';

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

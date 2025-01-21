'use server';
import { db } from '../utils/db';
import { doc, setDoc } from 'firebase/firestore';

export async function updateProject(formData: FormData) {
    const projectId = formData.get('projectId') as string;
    try {
        await setDoc(doc(db, 'projects', projectId), {
            projectId: projectId,
            number: formData.get('number'),
            name: formData.get('name'),
            client: formData.get('client'),
            type: formData.get('type'),
            numberSamples: formData.get('numberSamples'),
            tat: formData.get('tat'),
        });
    } catch (error) {
        console.error(`Error updating project ${projectId}`, error);
    }
}

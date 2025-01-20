// takes in createProject formdata and makes POST request to /projects
'use server';
import { doc, collection, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../../api/utils/db';

export async function createProject(formData: FormData) {
    const newProjectRef = doc(collection(db, 'projects'));
    const newProjectId = newProjectRef.id;
    const nextProjectNumber = await getProjectNumber();

    try {
        await setDoc(doc(db, 'projects', newProjectId), {
            projectId: newProjectId,
            number: nextProjectNumber,
            name: formData.get('name'),
            client: formData.get('client'),
            type: formData.get('type'),
            numberSamples: formData.get('numberSamples'),
            tat: formData.get('tat'),
        });
        const numberSamples = Number(formData.get('numberSamples'));
        const projectName = formData.get('name');

        // Create samples associated with project.
        for (let index = 0; index < numberSamples; index++) {
            const newSampleRef = doc(collection(db, 'samples'));
            const newSampleId = newSampleRef.id;
            await setDoc(doc(db, 'samples', newSampleId), {
                projectId: newProjectId,
                projectname: projectName,
                sampleId: newSampleId,
                sampleNumber: `${nextProjectNumber} - ${index + 1}`,
                sampleLabel: '',
                media: formData.get('type'),
                analyticalValue: 0,
                unit: getAnalyticalUnit(formData.get('type'))
            });
        }
    } catch (error) {
        return { Error: 'No response from server.' };
    }
}

// Gets next incremental project number
async function getProjectNumber() {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const currentCount = querySnapshot.size || 0;
    const newCount = currentCount + 1;
    return newCount;
}

function getAnalyticalUnit(projectType: any){
    if(projectType == 'soil'){
        return 'mg/kg'
    } return 'μg/L'
}

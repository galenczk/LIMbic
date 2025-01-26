import { db } from '../utils/db';
import { getDocs, setDoc, doc, collection } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';

// GET ALL PROJECTS
export async function GET(req: Request) {
    try {
        const projectsSnap = await getDocs(collection(db, 'projects'));
        const projects = projectsSnap.docs.map((project: any) => ({
            client: project.data().client,
            name: project.data().name,
            number: project.data().number,
            numberSamples: project.data().numberSamples,
            projectId: project.data().projectId,
            tat: project.data().tat,
            type: project.data().type,
        }));

        // Send back to client
        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects. Please try again later.' }, { status: 500 });
    }
}

// CREATE PROJECT
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const newProjectRef = doc(collection(db, 'projects'));
        const newProjectId = newProjectRef.id;
        const nextProjectNumber = await getProjectNumber();

        body.number = nextProjectNumber;
        body.projectId = newProjectId;
        body.samples = []

        let sampleUnit;
        if (body.type == 'Soil') {
            sampleUnit = 'mg/kg';
        } else if (body.type == 'Water') {
            sampleUnit = 'mcg/L';
        }
        
        // Create samples for project.
        for (let index = 0; index < body.numberSamples; index++) {
            const newSampleRef = doc(collection(db, 'samples'))
            body.samples.push({
                sampleId: newSampleRef.id,
                sampleNumber: `${nextProjectNumber} - ${index}`,
                sampleLabel: '',
                media: body.type,
                analyticalValue: 0,
                unit: sampleUnit,
            });
        }
        // Create project
        await setDoc(doc(db, 'projects', newProjectId), body);

        return NextResponse.json({
            status: 201,
            projectId: body.projectId,
            message: `Project ${body.projectId} updated successfully.`,
        });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project. Please try again later.' }, { status: 500 });
    }
}

// Gets next incremental project number
async function getProjectNumber() {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const currentCount = querySnapshot.size || 0;
    const newCount = currentCount + 1;
    return newCount;
}

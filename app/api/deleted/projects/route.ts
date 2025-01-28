import { db } from '../../utils/db';
import { getDocs, setDoc, doc, collection } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';

// GET ALL DELETED PROJECTS
export async function GET(req: Request) {
    try {
        const deletedProjectsSnap = await getDocs(collection(db, 'deletedProjects'));
        const deletedProjects = deletedProjectsSnap.docs.map((deletedProject: any) => ({
            client: deletedProject.data().client,
            name: deletedProject.data().name,
            number: deletedProject.data().number,
            numberSamples: deletedProject.data().numberSamples,
            projectId: deletedProject.data().projectId,
            tat: deletedProject.data().tat,
            type: deletedProject.data().type,
        }));

        return NextResponse.json({ deletedProjects });
    } catch (error) {
        console.error('Error fetching deleted projects:', error);
        return NextResponse.json({ error: 'Failed to fetch deleted projects. Please try again later.' }, { status: 500 });
    }
}

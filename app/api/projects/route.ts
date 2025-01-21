import { db } from '../utils/db';
import { getDocs, doc, collection } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Get all projects from firestore

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
}

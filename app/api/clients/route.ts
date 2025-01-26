import { db } from '../utils/db';
import { getDocs, setDoc, doc, collection } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';

// GET ALL CLIENTS
export async function GET(req: Request) {
    try {
        const clientSnap = await getDocs(collection(db, 'clients'));
        const clients = clientSnap.docs.map((client: any) => ({
            name: client.data().name,
            phone: client.data().phone,
            email: client.data().email,
            address: client.data().address,
            city: client.data().city,
            state: client.data().state,
            zip: client.data().zip,
        }));

        // Send back to client
        return NextResponse.json({ clients });
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: 'Failed to fetch clients. Please try again later.' }, { status: 500 });
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

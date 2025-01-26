import { db } from '../../utils/db';
import { getDoc, doc, setDoc, collection } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

// GET SINGLE CLIENT with clientId
export async function GET(req: NextRequest, { params }: { params: { clientId: string } }) {
    try {
        const clientId = await params.clientId;
        const clientSnap = await getDoc(doc(db, 'clients', clientId));

        if (!clientSnap.exists()) {
            return NextResponse.json({ error: `Client with ID ${clientId} not found.` }, { status: 404 });
        }

        const client = clientSnap.data();
        return NextResponse.json({ client });
    } catch (error) {
        console.error('Error fetching client:', error);
        return NextResponse.json({ error: 'Failed to fetch client. Please try again later.' }, { status: 500 });
    }
}

// UPDATE PROJECT with projectId
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.projectId) {
            return NextResponse.json({ error: 'Missing projectId in request body.' }, { status: 400 });
        }

        await setDoc(doc(db, 'projects', body.projectId), body);

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

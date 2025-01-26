import { db } from '../../utils/db';
import { getDoc, doc, setDoc, collection, deleteDoc } from 'firebase/firestore';
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

// UPDATE CLIENT with clientId
export async function POST(req: NextRequest, { params }: { params: { clientId: string } }) {
    try {
        const body = await req.json();
        const clientId = await params.clientId;

        await setDoc(doc(db, 'clients', clientId), body);

        return NextResponse.json({
            status: 201,
            clientId: clientId,
            message: `Client ${clientId} updated successfully.`,
        });
    } catch (error) {
        console.error('Error updating client:', error);
        return NextResponse.json({ error: 'Failed to update client. Please try again later.' }, { status: 500 });
    }
}

// DELETE CLIENT with clientId
export async function DELETE(req: NextRequest, { params }: { params: { clientId: string } }) {
    try {
        const clientId = await params.clientId;

        const client = await getDoc(doc(db, 'clients', clientId));

        // Create new doc in deletedProjects. If this fails, error out.
        await setDoc(doc(db, 'deletedClients', clientId), client.data());

        // Remove Project.
        await deleteDoc(doc(db, 'clients', clientId));

        return NextResponse.json({
            status: 202,
            clientId: clientId,
            message: `Client ${clientId} deleted successfully.`,
        });
    } catch (error) {
        console.error('Error deleting client:', error);
        return NextResponse.json({ error: 'Failed to delete client. Please try again later.' }, { status: 500 });
    }
}

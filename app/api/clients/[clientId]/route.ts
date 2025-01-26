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

// UPDATE CLIENT with clientId
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.clientId) {
            return NextResponse.json({ error: 'Missing clientId in request body.' }, { status: 400 });
        }

        await setDoc(doc(db, 'clients', body.clientId), body);

        return NextResponse.json({
            status: 201,
            clientId: body.clientId,
            message: `Client ${body.clientId} updated successfully.`,
        });
    } catch (error) {
        console.error('Error updating client:', error);
        return NextResponse.json({ error: 'Failed to update client. Please try again later.' }, { status: 500 });
    }
}

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
            clientId: client.data().clientId,
        }));

        // Send back to client
        return NextResponse.json({ clients });
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: 'Failed to fetch clients. Please try again later.' }, { status: 500 });
    }
}

// CREATE CLIENT
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const newClientRef = doc(collection(db, 'clients'));
        const newClientId = newClientRef.id;

        body.clientId = newClientId

        await setDoc(doc(db, 'clients', newClientId), body);

        return NextResponse.json({
            status: 201,
            newClientId: newClientId,
            message: `Client ${newClientId} created successfully.`,
        });
    } catch (error) {
        console.error('Error creating new client:', error);
        return NextResponse.json({ error: 'Failed to create client. Please try again later.' }, { status: 500 });
    }
}

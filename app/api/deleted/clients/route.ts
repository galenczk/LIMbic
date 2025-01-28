import { db } from '../../utils/db';
import { getDocs, setDoc, doc, collection } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';

// GET ALL DELETED CLIENTS
export async function GET(req: Request) {
    try {
        const deletedClientsSnap = await getDocs(collection(db, 'deletedClients'));
        const deletedClients = deletedClientsSnap.docs.map((deletedClient: any) => ({
            address: deletedClient.data().address,
            city: deletedClient.data().city,
            clientId: deletedClient.data().clientId,
            email: deletedClient.data().email,
            name: deletedClient.data().name,
            phone: deletedClient.data().phone,
            state: deletedClient.data().state,
            zip: deletedClient.data().zip,
        }));

        return NextResponse.json({ deletedClients });
    } catch (error) {
        console.error('Error fetching deleted clients:', error);
        return NextResponse.json({ error: 'Failed to fetch deleted clients. Please try again later.' }, { status: 500 });
    }
}

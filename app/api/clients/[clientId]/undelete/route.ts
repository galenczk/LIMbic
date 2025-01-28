import { db } from '@/app/api/utils/db';
import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

// UNDELETE CLIENT with clientId
export async function POST(req: NextRequest, { params }: { params: { clientId: string } }) {
    try {
        const clientId = await params.clientId;

        const clientRef = doc(db, 'deletedClients', clientId);
        const client = await getDoc(clientRef);

        // Create new doc in deletedProjects. If this fails, error out.
        await setDoc(doc(db, 'clients', clientId), client.data());

        // Remove Project.
        await deleteDoc(doc(db, 'deletedClients', clientId));

        return NextResponse.json({
            status: 202,
            projectId: clientId,
            message: `Client ${clientId} undeleted successfully.`,
        });
    } catch (error) {
        console.error('Error undeleting client:', error);
        return NextResponse.json({ error: 'Failed to undelete client. Please try again later.' }, { status: 500 });
    }
}

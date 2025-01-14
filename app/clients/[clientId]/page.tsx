import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/utils/db';

interface ClientPageProps {
    params: { clientId: string };
}

export default async function clientInfoPage({ params }: ClientPageProps) {
    // Get data for single Client based on clientId
    const { clientId } = await params;
    const docRef = doc(db, 'clients', clientId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return <div>Client not found</div>;
    }
    const client = docSnap.data();

    return (
        <div>
            <div>
                <h1>{client.name}</h1>
                <h1>{client.phone}</h1>
                <h1>{client.email}</h1>
                <h1>{client.address}</h1>
                <h1>{client.city}</h1>
                <h1>{client.state}</h1>
                <h1>{client.zip}</h1>
            </div>
            <Link href={`/clients/update/${clientId}`}>Edit Client</Link>
        </div>
    );
}

import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../api/utils/db';
import {updateClient} from '../../../api/utils/updateClient'

interface ClientPageProps {
    params: { clientId: string };
}

export default async function updateClientPage({ params }: ClientPageProps) {
    // Get data for single Client based on clientId
    const { clientId } = params;
    const docRef = doc(db, 'clients', clientId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return <div>Client not found</div>;
    }
    const client = docSnap.data();

    return (
        <div>
            <form action={updateClient} className='text-black'>
                <input type='text' name='name' defaultValue={client.name} />
                <input type='text' name='phone' defaultValue={client.phone} />
                <input type='text' name='email' defaultValue={client.email} />
                <input type='text' name='address' defaultValue={client.address} />
                <input type='text' name='city' defaultValue={client.city} />
                <input type='text' name='state' defaultValue={client.city} />
                <input type='text' name='zip' defaultValue={client.zip} />
                <input type='hidden' name='clientId' defaultValue={client.clientId} />
                <button type='submit' className='bg-slate-300 '>
                    Update Client
                </button>
            </form>
        </div>
    );
}

import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/utils/db';
import DeleteClientButton from '@/app/components/deleteClientButton';

interface ClientPageProps {
    params: { clientId: string };
}

export default async function clientInfoPage({ params }: ClientPageProps) {
    const {clientId} = await params
    const client = await getSingleClient(clientId)

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
            <div />
            <DeleteClientButton clientId={clientId} deleteClient={deleteClient}/>
        </div>
    );
}

async function getSingleClient(clientId: string){
    const res = await fetch(`http://localhost:3000/api/clients/${clientId}`);
    const data = await res.json();
    return data.client;
}

async function deleteClient(clientId: string) {
    'use server'
    const res = fetch(`http:localhost:3000/api/clients/${clientId}`, {
        method: 'DELETE',
    });
}
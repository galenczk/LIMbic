import Link from 'next/link';

interface ClientPageProps {
    params: { clientId: string };
}

export default async function updateClientPage({ params }: ClientPageProps) {
    // Get data for single Client based on clientId
    const { clientId } = params;
    const client = await getSingleClient(clientId)

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

async function getSingleClient(clientId) {
    const res = await fetch(`http://localhost:3000/api/clients/${clientId}`);
    const data = await res.json();
    return data.client;
}

async function updateClient(formData) {
    'use server';
    const clientId = formData.get('clientId');
    const client = {
        address: formData.get('address'),
        city: formData.get('city'),
        clientId: formData.get('clientId'),
        email: formData.get('email'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        state: formData.get('state'),
        zip: formData.get('zip'),
    };
    const res = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
    });
    const status = await res.json();
    return status;
}

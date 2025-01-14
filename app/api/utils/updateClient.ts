// takes in createClient formdata and makes POST request to /projects
'use server';
import { db } from '../utils/db';
import { doc, setDoc } from 'firebase/firestore';

export async function updateClient(formData: FormData) {
    const clientId = formData.get('clientId');
    try {
        await setDoc(doc(db, 'clients', clientId), {
            clientId: clientId,
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
        });
    } catch (error) {
        console.error(`Error updating client ${clientId}`, error);
    }
}

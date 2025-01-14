// takes in createClient formdata and makes POST request to /projects
'use server';
import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from '../../api/utils/db';

export async function createClient(formData: FormData) {
    const newDocRef = doc(collection(db, 'clients'));
    const newDocId = newDocRef.id;

    try {
        await setDoc(doc(db, 'clients', newDocId), {
            clientId: newDocId,
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
        });
    } catch (error: any) {
        return { Error: 'No response from server.' };
    }
}

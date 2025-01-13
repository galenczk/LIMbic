'use server';
import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, getDocs, addDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// UPDATE a client
export async function PUT(request: Request) {
    const data = await request.json();

    try {
        const querySnapshot = await getDocs(query(collection(db, 'clients'), where('clientId', '==', data.clientId)));
        if (querySnapshot.empty) {
            console.error('No client found with the provided clientId');
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        const clientDoc = querySnapshot.docs[0];
        

        await setDoc(doc(db, 'clients', clientId), {
            clientNumber: data.clientNumber,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
        });
    } catch (error) {
        console.error('Error creating client:', error);
        return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
}

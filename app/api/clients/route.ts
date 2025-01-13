'use server';
import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

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

export async function GET(request: Request) {
    try {
        const querySnapshot = await getDocs(collection(db, 'clients'));

        const clients = querySnapshot.docs.map((client: any) => ({
            name: client.data().name,
            phone: client.data().phone,
            email: client.data().email,
            address: client.data().address,
            city: client.data().city,
            state: client.data().state,
            zip: client.data().zip,
        }));

        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

// Create client
export async function POST(request: Request) {
    const data = await request.json();
    console.log(data);

    try {
        const docRef = await addDoc(collection(db, 'clients'), {
            name: data.name,
            phone: data.client,
            email: data.type,
            address: data.numberSamples,
            city: data.city,
            state: data.state,
            zip: data.zip,
        });
    } catch (error) {
        console.error('Error creating client:', error);
        return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
}

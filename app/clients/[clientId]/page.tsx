import Link from 'next/link';
import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, getDoc, addDoc, setDoc } from 'firebase/firestore';

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

interface ClientPageProps {
    params: { clientId: string };
}

export default async function clientInfoPage({ params }: ClientPageProps) {
    const { clientId } = params;

    const docRef = doc(db, 'clients', clientId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return <div>Client not found</div>;
    }

    const client = docSnap.data();

    return (
        <div>
            <h1>{client.name}</h1>
        </div>
    );
}

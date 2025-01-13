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

// GET all projects
export async function GET(request: Request) {
    try {
        const querySnapshot = await getDocs(collection(db, 'projects'));

        const projects = querySnapshot.docs.map((project: any) => ({
            number: project.data().number,
            name: project.data().name,
            client: project.data().client,
            type: project.data().type,
            numberSamples: project.data().numberSamples,
            openedDate: project.data().openedDate,
            tat: project.data().tat,
            dueDate: project.data().dueDate,
            value: project.data().value,
        }));

        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

// CREATE project
export async function POST(request: Request) {
    const data = await request.json();
    const newDocRef = doc(collection(db, 'projects'));
    const newDocId = newDocRef.id;
    const nextProjectNumber = await getProjectNumber();

    try {
        const docRef = await addDoc(collection(db, 'projects'), {
            projectId: newDocId,
            number: nextProjectNumber,
            name: data.name,
            client: data.client,
            type: data.type,
            numberSamples: data.numberSamples,
            tat: data.tat,
        });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

// Gets next project number
async function getProjectNumber() {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const currentCount = querySnapshot.size || 0;
    const newCount = currentCount + 1;
    return newCount;
}

// UPDATE project
export async function PUT(request: Request) {
    const data = await request.json();
    console.log(data);

    try {
        const querySnapshot = await getDocs(query(collection(db, 'clients'), where('clientId.', '==', data.clientId)))
        if (querySnapshot.empty){
            console.error('No client found with the provided clientId');
            return NextResponse.json({error: 'Client not found'}, {status: 404})
        }    
        
    await setDoc(doc(db, 'clients', data.clientId), {
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
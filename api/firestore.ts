import { initializeApp } from 'firebase/app';
import * as fs from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyCoFYfYph1vIC6HOYxCsZtQkVGJEhWVR5E',
    authDomain: 'limbic-420220.firebaseapp.com',
    projectId: 'limbic-420220',
    storageBucket: 'limbic-420220.appspot.com',
    messagingSenderId: '146189069758',
    appId: '1:146189069758:web:d7bd606e9092e08d0b1def',
    measurementId: 'G-LHJGH37XEK',
};

const app = initializeApp(firebaseConfig);

export const db = fs.getFirestore(app);

interface Client {
    name: string;
    email: string;
}

export async function createClient(client: Client) {
    const docRef = await fs.addDoc(fs.collection(db, 'clients'), client);
    console.log('Client created with id:', docRef.id);
}


export async function getAllClients() {
    const clientsCollection = fs.collection(db, 'clients');
    const snapshot = await fs.getDocs(clientsCollection);
    const clients: Client[] = [];
    snapshot.forEach((doc) => {
        clients.push(doc.data() as Client);
    });
    return clients;
}

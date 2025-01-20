'use server';
import { db } from '../utils/db';
import { doc, setDoc } from 'firebase/firestore';

export async function dataEntry(formData: FormData) {
    // Get the sample count and iterate through a Firebase update for each
    const sampleCount = Number(formData.get('sampleCount'));

    console.log(formData);
    

    for (let index = 0; index < sampleCount; index++) {
        try {
            await setDoc(doc(db, 'samples', formData.get('')))
        } catch (error) {
            
        }
    }
    
}

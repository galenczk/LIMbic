'use server'
import { db } from './db';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';

export default async function deleteProject(project: any) {
    console.log(project);
    
    
    // Add deletedProject doc with Project data
    //await setDoc(doc(db, 'deletedProjects', project.projectId), project);

    // Delete project
    //await deleteDoc(doc(db, 'projects', project.projectId));
}

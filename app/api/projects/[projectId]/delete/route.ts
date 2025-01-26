import { db } from '@/app/api/utils/db';
import { getDoc, deleteDoc, doc, setDoc, collection } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

// DELETE PROJECT with projectId
export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const body = await req.json();

        if (!body.projectId) {
            return NextResponse.json({ error: 'Missing projectId in request body.' }, { status: 400 });
        }

        const projectRef = doc(db, 'projects', body.projectId)
        const project = await getDoc(projectRef) 
        
        // Create new doc in deletedProjects. If this fails, error out.
        await setDoc(doc(db, 'deletedProjects', body.projectId), project)

        // Remove Project.
        await deleteDoc(doc(db, 'projects', body.projectId))
        
        return NextResponse.json({
            status: 202,
            projectId: body.projectId,
            message: `Project ${body.projectId} deleted successfully.`,
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project. Please try again later.' }, { status: 500 });
    }
}
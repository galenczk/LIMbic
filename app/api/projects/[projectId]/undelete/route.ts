import { db } from '@/app/api/utils/db';
import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

// UNDELETE PROJECT with projectId
export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const projectId = await params.projectId;

        const projectRef = doc(db, 'deletedProjects', projectId);
        const project = await getDoc(projectRef);

        // Create new doc in deletedProjects. If this fails, error out.
        await setDoc(doc(db, 'projects', projectId), project.data());

        // Remove Project.
        await deleteDoc(doc(db, 'deletedProjects', projectId));

        return NextResponse.json({
            status: 202,
            projectId: projectId,
            message: `Project ${projectId} deleted successfully.`,
        });
    } catch (error) {
        console.error('Error undeleting project:', error);
        return NextResponse.json({ error: 'Failed to undelete project. Please try again later.' }, { status: 500 });
    }
}

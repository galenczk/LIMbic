import { db } from '../../utils/db';
import { getDoc, doc, setDoc, collection, deleteDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// GET SINGLE PROJECT with projectID
export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const projectId = await params.projectId;
        const projectSnap = await getDoc(doc(db, 'projects', projectId));

        if (!projectSnap.exists()) {
            return NextResponse.json({ error: `Project with ID ${projectId} not found.` }, { status: 404 });
        }

        const project = projectSnap.data();
        return NextResponse.json({ project });
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json({ error: 'Failed to fetch project. Please try again later.' }, { status: 500 });
    }
}

// UPDATE PROJECT with projectId
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.projectId) {
            return NextResponse.json({ error: 'Missing projectId in request body.' }, { status: 400 });
        }

        await setDoc(doc(db, 'projects', body.projectId), body);

        return NextResponse.json({
            status: 201,
            projectId: body.projectId,
            message: `Project ${body.projectId} updated successfully.`,
        });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project. Please try again later.' }, { status: 500 });
    }
}

// DELETE PROJECT with projectId
export async function DELETE(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const projectId = await params.projectId;

        const projectRef = doc(db, 'projects', projectId);
        const project = await getDoc(projectRef);

        // Create new doc in deletedProjects. If this fails, error out.
        await setDoc(doc(db, 'deletedProjects', projectId), project.data());

        // Remove Project.
        await deleteDoc(doc(db, 'projects', projectId));

        return NextResponse.json({
            status: 202,
            projectId: projectId,
            message: `Project ${projectId} deleted successfully.`,
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project. Please try again later.' }, { status: 500 });
    }
}

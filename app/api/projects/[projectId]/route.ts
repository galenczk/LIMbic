import { db } from '../../utils/db';
import { getDoc, doc, setDoc, collection } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// Get a single project with projectId
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

// Updates project data
export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const body = await req.json();

        if (!body.projectId) {
            return NextResponse.json(
                { error: 'Missing projectId in request body.' },
                { status: 400 }
            );
        }

        await setDoc(doc(db, 'projects', body.projectId), body);

        return NextResponse.json({
            status: 201,
            projectId: body.projectId,
            message: `Project ${body.projectId} updated successfully.`
        });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { error: 'Failed to update project. Please try again later.' },
            { status: 500 }
        );
    }


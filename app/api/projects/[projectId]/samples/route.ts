import { db } from '@/app/api/utils/db';
import { getDoc, getDocs, doc, setDoc, collection, query, where } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// GET ALL SAMPLES for projectId
export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const projectId = await params.projectId;
        const q = query(collection(db, 'samples'), where('projectId', '==', projectId));
        const querySnap = await getDocs(q);

        const samples = querySnap.docs.map((sample: any) => ({
            projectId: sample.data().projectId,
            projectName: sample.data().projectName,
            sampleId: sample.data().sampleId,
            sampleNumber: sample.data().sampleNumber,
            sampleLabel: sample.data().sampleLabel,
            media: sample.data().media,
            analyticalValue: sample.data().analyticalValue,
            unit: sample.data().unit,
        }));

        return NextResponse.json({ samples });
    } catch (error) {
        console.error(`Error retrieving samples:`, error);
        return NextResponse.json({ error: 'Failed to retreive samples. Please try again later.' }, { status: 500 });
    }
}

// UPDATE SAMPLE DATA for projectId
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

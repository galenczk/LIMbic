import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/utils/db';

interface ProjectPageProps {
    params: { projectId: string };
}

export default async function projectInfoPage({ params }: ProjectPageProps) {
    // Get data for single Client based on clientId
    const { projectId } = await params;
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return <div>Project not found</div>;
    }
    const project = docSnap.data();

    return (
        <div>
            <div>
                <h1>{project.number}</h1>
                <h1>{project.name}</h1>
                <h1>{project.client}</h1>
                <h1>{project.type}</h1>
                <h1>{project.numberSamples}</h1>
                <h1>{project.tat}</h1>
            </div>
            <Link href={`/projects/update/${projectId}`}>Edit Project Details</Link>
            <div />
            <Link href={`/projects/dataEntry/${projectId}`}>Enter Analytical Data</Link>
        </div>
    );
}

import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/utils/db';

export default async function projectsPage() {
    // Get all Projects from firestore.
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
        projectId: project.data().projectId,
    }));

    // Look at how to render date when you start adding projects via a form on client
    // Need to add openedDate, dueDate, and value. Should go opened, tat, due, value
    return (
        <div>
            <Link href={'/'} className='bg-blue-400'>
                Home
            </Link>
            <h2>Projects</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Client</th>
                            <th>Type</th>
                            <th>No. Samples</th>
                            <th>TAT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project: any, key: number) => (
                            <tr key={key}>
                                <td>{project.number}</td>
                                <td>
                                    <Link href={`/projects/${project.projectId}`}>{project.name}</Link>
                                </td>
                                <td>{project.client}</td>
                                <td>{project.type}</td>
                                <td>{project.numberSamples}</td>
                                <td>{project.tat}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link href={'/projects/create'}>New Project</Link>
            </div>
        </div>
    );
}

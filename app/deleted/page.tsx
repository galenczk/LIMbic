import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/utils/db';
import UndeleteClientButton from '../components/undeleteClientButton';
import UndeleteProjectButton from '../components/undeleteProjectButton';

export default async function deletedEntitiesPage() {
    const deletedProjects = await getAllDeletedProjects();
    const deletedClients = await getAllDeletedClients();

    // Look at how to render date when you start adding projects via a form on client
    // Need to add openedDate, dueDate, and value. Should go opened, tat, due, value
    return (
        <div>
            <Link href={'/'} className='bg-blue-400'>
                Home
            </Link>
            <h2>Deleted Projects</h2>
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
                        {deletedProjects.map((project: any, key: number) => (
                            <tr key={key}>
                                <td>{project.number}</td>
                                <td>{project.name}</td>
                                <td>{project.client}</td>
                                <td>{project.type}</td>
                                <td>{project.numberSamples}</td>
                                <td>{project.tat}</td>
                                <td>
                                    <UndeleteProjectButton projectId={project.projectId} undeleteProject={undeleteProject} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h2>Deleted Clients</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deletedClients.map((client: any, key: number) => (
                            <tr key={key}>
                                <td>{client.name}</td>
                                <td>{client.phone}</td>
                                <td>{client.email}</td>
                                <td>{client.address}</td>
                                <td>{client.city}</td>
                                <td>{client.state}</td>
                                <td>{client.zip}</td>
                                <td>
                                    <UndeleteClientButton clientId={client.clientId} undeleteClient={undeleteClient} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

async function getAllDeletedProjects() {
    const res = await fetch('http://localhost:3000/api/deleted/projects');
    const data = await res.json();
    return data.deletedProjects;
}

async function getAllDeletedClients() {
    const res = await fetch('http://localhost:3000/api/deleted/clients');
    const data = await res.json();
    return data.deletedClients;
}

async function undeleteProject(projectId: string) {
    'use server';
    const res = fetch(`http:localhost:3000/api/projects/${projectId}/undelete`, {
        method: 'POST',
    });
}

async function undeleteClient(clientId: string) {
    'use server';
    const res = fetch(`http:localhost:3000/api/clients/${clientId}/undelete`, {
        method: 'POST',
    });
}

// Data entry page
// Get the number of samples for this project and get the actual sample objects from db.
// Render a form for each of these that only edits the sample information.
// When a sample is created, it should have all properties that it will need for its lifetime.

// This should be an edit page for samples within this project, with limited edit capability.
import Link from 'next/link';
import Form from 'next/form';
import { collection, getDocs, getDoc, query, setDoc, doc, where } from 'firebase/firestore';
import { db } from '../../../api/utils/db';

interface DataEntryProps {
    params: { projectId: string };
}

// DATA ENTRY PAGE
export default async function dataEntryPage({ params }: DataEntryProps) {
    // Get data for this Project
    const { projectId } = await params;
    const project = await getSingleProject(projectId);
    // Get all samples for this Project
    let samples = project.samples;

    async function updateSamples(formData) {
        'use server';
        let analyticalValues = formData.getAll('analyticalValue')
        let sampleLabels = formData.getAll('sampleLabel')
        for (let index = 0; index < samples.length; index++) {
            project.samples[index].analyticalValue = analyticalValues[index]
            project.samples[index].sampleLabel = sampleLabels[index]
        }
        const res = await fetch(`http:localhost:3000/api/projects/${projectId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
    }

    return (
        <div>
            <Form action={updateSamples}>
                <input type='hidden' name='numberSamples' defaultValue={samples.length}></input>

                <table>
                    <thead>
                        <tr>
                            <th>Sample Number</th>
                            <th>Sample Label</th>
                            <th>Analytical Result</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {samples.map((sample: any, key: number) => (
                            <tr key={key}>
                                <td>{sample.sampleNumber}</td>
                                <td>
                                    <input type='text' name='sampleLabel' className='text-black' defaultValue={sample.sampleLabel} required />
                                </td>
                                <td>
                                    <input
                                        type='text'
                                        name='analyticalValue'
                                        className='text-black'
                                        defaultValue={sample.analyticalValue}
                                        required
                                    />
                                </td>
                                <td>{sample.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type='submit' className='bg-slate-300'>
                    Save
                </button>
            </Form>
        </div>
    );
}

async function getSingleProject(projectId: string) {
    const res = await fetch(`http://localhost:3000/api/projects/${projectId}`);
    const data = await res.json();
    return data.project;
}

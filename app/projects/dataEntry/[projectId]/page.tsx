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
    let samples = await getSamples(projectId);
    console.log(samples);

    async function updateSamples(formData) {
        'use server';
        for (let index = 0; index < samples.length; index++) {
            // Assign new values to samples array of objects
            samples[index].analyticalValue = formData.getAll('analyticalValue')[index];
            samples[index].sampleLabel = formData.getAll('sampleLabel')[index];

            // Firestore update
            await setDoc(doc(db, 'samples', formData.getAll('sampleIds')[index]), samples[index]);
        }
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
                                    {/** Hidden input to include sampleId in formData */}
                                    <input type='hidden' name='sampleIds' defaultValue={sample.sampleId}></input>

                                    <input type='text' name='sampleLabel' className='text-black' required />
                                </td>
                                <td>
                                    <input type='text' name='analyticalValue' className='text-black' required />
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

async function getSamples(projectId: string) {
    const res = await fetch(`http://localhost:3000/api/projects/${projectId}/samples`);
    const data = await res.json();
    return data.samples;
}

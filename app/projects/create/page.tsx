import Link from 'next/link';

export default async function createProjectPage() {
    return (
        <div>
            <form action={createProject} className='text-black'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' defaultValue='Test Project 1234' />
                <label htmlFor='client'>Client</label>
                <input type='text' name='client' id='client' defaultValue='Test Client 1234' />
                <label htmlFor='type'>Project Type</label>
                <input type='text' name='type' id='type' defaultValue='Soil' />
                <label htmlFor='numberSamples'>No. of Samples</label>
                <input type='number' name='numberSamples' id='numberSamples' defaultValue='3' />
                <label htmlFor='tat'>TAT</label>
                <input type='number' name='tat' id='tat' defaultValue='12340' />
                <button type='submit' className='bg-slate-300 '>
                    Create Project
                </button>
            </form>
        </div>
    );
}

async function createProject(formData) {
    'use server';
    const project = {
        number: formData.get('number'),
        name: formData.get('name'),
        client: formData.get('client'),
        type: formData.get('type'),
        numberSamples: formData.get('numberSamples'),
        tat: formData.get('tat'),
        projectId: formData.get('projectId'),
    };
    const res = await fetch(`http://localhost:3000/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    });
    const status = await res.json();
    return status;
}

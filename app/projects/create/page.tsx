import Link from 'next/link';
import { createProject } from '../../api/utils/createProject';

export default async function createProjectPage() {
    return (
        <div>
            <form action={createProject} className='text-black'>
                <input type='text' name='name' defaultValue='Test Project 1234' />
                <input type='text' name='client' defaultValue='Test Client 1234' />
                <input type='text' name='type' defaultValue='Soil' />
                <input type='number' name='numberSamples' defaultValue='3' />
                <input type='number' name='tat' defaultValue='12340' />
                <button type='submit' className='bg-slate-300 '>
                    Create Project
                </button>
            </form>
        </div>
    );
}

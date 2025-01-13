import Link from 'next/link';

export default async function createProjectPage() {

    return (
        <div>
            <form action={createProject}>
                <input type='text' name='name'/>
                <input type='text' name='client'/>
                <input type='text' name='type'/>
                <input type='text' name='numberSamples'/>
                <input type='text' name='tat'/> 
                <button onClick={submit}></button>
            </form>
        </div>
    );
}

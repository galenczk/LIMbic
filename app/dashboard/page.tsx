import axios from 'axios';

interface Client {
    name: string;
    email: string;
}

export default async function Projects() {
    const reply = await fetch('http://localhost:3030/clients');
    const clients = await reply.json();

    return (
        <main>
            <div className='flex '>
                <div>
                    <h1 className='font-bold text-xl'>Projects</h1>
                </div>
                <div className='btn ml-auto'>
                    <button>Open New Project</button>
                </div>
            </div>
            <div id='table' className=''>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client: Client, index: number) => (
                            <tr key={index}>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

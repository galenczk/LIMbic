import Link from 'next/link';

export default async function clientsPage() {
    let response = await fetch('http://localhost:3000/api/clients');
    const clients = await response.json();
    
    return (
        <div>
            <Link href={'/'} className='bg-blue-400'>
                Home
            </Link>
            <h2>Clients</h2>

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
                        {clients.map((client: any, key: string) => (
                            <tr key={key}>
                                <td><Link href={`/clients/${client.clientId}`}>{client.name}</Link></td>
                                <td>{client.phone}</td>
                                <td>{client.email}</td>
                                <td>{client.address}</td>
                                <td>{client.city}</td>
                                <td>{client.state}</td>
                                <td>{client.clientId}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link href={'/clients/create'}>New Client</Link>
            </div>
        </div>
    );
}

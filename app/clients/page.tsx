import Link from 'next/link';

export default function clientsPage() {
    return (
        <div>
            <Link href={'/'} className='bg-blue-400'>
                Home
            </Link>
            <h2>Clients</h2>
        </div>
    );
}

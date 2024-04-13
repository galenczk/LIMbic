import Link from 'next/link';

export default function SideNav() {
    return (
        <div className='flex flex-col h-full border-r-4'>
            <Link
                className='text-blue-800 p-4'
                href='/'>
                Home
            </Link>
            <Link
                className='text-blue-800 p-4'
                href='/dashboard'>
                Projects
            </Link>
            <Link
                className='text-blue-800 p-4'
                href='/dashboard'>
                Clients
            </Link>
            <Link
                className='text-blue-800 p-4 mt-auto'
                href='/dashboard'>
                Trash
            </Link>
        </div>
    );
}

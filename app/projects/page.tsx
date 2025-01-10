import Link from 'next/link'

export default function projectsPage(){
    return (
        <div>
            <Link href={'/'} className='bg-blue-400'>Home</Link>
            <h2>Projects</h2>
        </div>
    )
}
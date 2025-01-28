import Link from 'next/link'

// Home page, login screen

export default function Home() {
  return (
      <div className='flex flex-col'>
          <div> Login Screen</div>
          <Link href={`/projects/`} className='bg-blue-400'>
              Projects
          </Link>
          <div />
          <Link href={`/clients/`} className='bg-blue-400'>
              Clients
          </Link>
          <div />
          <Link href={`/deleted`} className='bg-blue-400'>
              Deleted Entities
          </Link>

          
      </div>
  );
}

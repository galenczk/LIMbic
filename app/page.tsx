import Link from 'next/link'

// Home page, login screen



export default function Home() {
  return (
      <div>
          <div> Login Screen</div>
          <Link href={`/projects/`} className='bg-blue-400'>
              Projects
          </Link>
          <div />
          <Link href={`/clients/`} className='bg-blue-400'>
              Clients
          </Link>
      </div>
  );
}

import SideNav from "./ui/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
            <div className='flex-none md:w-48'>
                <SideNav />
            </div>
            <div className='flex-grow p-6 md:overflow-y-auto md:p-4'>
                {children}
            </div>
        </div>
    );
}

import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'LIMS - Laboratory Information and Data Management System',
    description: 'LIMS created by Galen Ciszek in 2024/2025',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <header className='p-3 bg-slate-800 text-white text-lg font-bold'>
                    LIMS - Laboratory Information and Data Management System
                </header>
                <div className='bg-slate-700 min-h-screen'>{children}</div>
                <footer className='p-2 bg-slate-900 text-white text-center'>Copyright: Galen Ciszek 2025</footer>
            </body>
        </html>
    );
}

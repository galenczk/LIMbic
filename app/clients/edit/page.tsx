import Link from 'next/link';
import { updateClient } from '../../api/utils/updateClient.ts';

export default async function createProjectPage() {
    return (
        <div>
            <form action={updateClient} className='text-black'>
                <input type='text' name='name' defaultValue='Test Client 1234' />
                <input type='text' name='phone' defaultValue='1234567000' />
                <input type='text' name='email' defaultValue='asdf@qwer.com' />
                <input type='text' name='address' defaultValue='123 Home St' />
                <input type='text' name='city' defaultValue='Portland' />
                <input type='text' name='state' defaultValue='OR' />
                <input type='text' name='zip' defaultValue='12345' />
                <button type='submit' className='bg-slate-300 '>
                    Update Client
                </button>
            </form>
        </div>
    );
}
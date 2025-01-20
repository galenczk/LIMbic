import Link from 'next/link';
import { createClient } from '../../api/utils/createClient';

export default async function createProjectPage() {
    return (
        <div>
            <form action={createClient} className='text-black'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' defaultValue='Test Client 1234' />
                <label htmlFor='name'>Phone No.</label>
                <input type='text' name='phone' id='phone' defaultValue='1234567000' />
                <label htmlFor='name'>Email</label>
                <input type='text' name='email' id='email' defaultValue='asdf@qwer.com' />
                <label htmlFor='name'>Address</label>
                <input type='text' name='address' id='address' defaultValue='123 Home St' />
                <label htmlFor='name'>City</label>
                <input type='text' name='city' id='city' defaultValue='Portland' />
                <label htmlFor='name'>State</label>
                <input type='text' name='state' id='state' defaultValue='OR' />
                <label htmlFor='name'>Zip</label>
                <input type='text' name='zip' id='zip' defaultValue='12345' />
                <button type='submit' className='bg-slate-300 '>
                    Add Client
                </button>
            </form>
        </div>
    );
}

import Link from 'next/link';
import type { ReactNode } from 'react';

import { logoutAction } from '@/app/admin/(protected)/logout/actions';

const AdminShell = ({ children }: { children: ReactNode }) => (
    <main className='admin-page font-brand'>
        <header className='admin-header'>
            <Link href='/admin' className='admin-header__brand'>
                Ibu Bos <span>beheer</span>
            </Link>
            <nav aria-label='Beheernavigatie'>
                <Link href='/admin/blogs'>Blogs</Link>
                <Link href='/admin/projecten'>Projecten</Link>
                <Link href='/' target='_blank'>
                    Bekijk website
                </Link>
                <form action={logoutAction}>
                    <button type='submit'>Uitloggen</button>
                </form>
            </nav>
        </header>
        <div className='admin-content'>{children}</div>
    </main>
);

export default AdminShell;


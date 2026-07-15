'use server';

import { redirect } from 'next/navigation';

import { authenticateAdmin, createAdminSession } from '@/lib/admin/auth';

export const loginAction = async (formData: FormData) => {
    const username = String(formData.get('username') ?? '');
    const password = String(formData.get('password') ?? '');

    if (!authenticateAdmin(username, password)) redirect('/admin/login?error=1');
    await createAdminSession();
    redirect('/admin');
};


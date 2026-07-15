import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { verifyCredentials } from './credentials';
import { createSessionToken, verifySessionToken } from './session';

export const ADMIN_COOKIE = 'ibu-admin-session';

export const isAdminConfigured = () =>
    Boolean(
        process.env.AUTH_SECRET?.trim() &&
            process.env.ADMIN_USERNAME?.trim() &&
            process.env.ADMIN_PASSWORD_HASH?.trim()
    );

export const authenticateAdmin = (username: string, password: string) => {
    const expectedUsername = process.env.ADMIN_USERNAME?.trim() ?? '';
    const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim() ?? '';

return isAdminConfigured() && verifyCredentials(username, password, expectedUsername, passwordHash);
};

export const hasAdminSession = async () => {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value;
    const secret = process.env.AUTH_SECRET?.trim();

return Boolean(token && secret && verifySessionToken(token, secret));
};

export const requireAdmin = async () => {
    if (!(await hasAdminSession())) redirect('/admin/login');
};

export const createAdminSession = async () => {
    const secret = process.env.AUTH_SECRET?.trim();
    if (!secret) throw new Error('Admin-authenticatie is nog niet geconfigureerd.');

    (await cookies()).set(ADMIN_COOKIE, createSessionToken(secret), {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 12
    });
};

export const clearAdminSession = async () => {
    (await cookies()).set(ADMIN_COOKIE, '', { httpOnly: true, sameSite: 'strict', path: '/', maxAge: 0 });
};


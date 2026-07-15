import { redirect } from 'next/navigation';

import { hasAdminSession, isAdminConfigured } from '@/lib/admin/auth';

import { loginAction } from './actions';

type LoginPageProps = { searchParams: Promise<{ error?: string }> };

const LoginPage = async ({ searchParams }: LoginPageProps) => {
    if (await hasAdminSession()) redirect('/admin');
    const { error } = await searchParams;
    const configured = isAdminConfigured();

    return (
        <main className='admin-page admin-login font-brand'>
            <section className='admin-login__card'>
                <p className='section-kicker'>Ibu Bos beheer</p>
                <h1>Inloggen</h1>
                <p>Beheer hier samen de blogs en projecten van Ibu Bos.</p>
                {!configured ? (
                    <div className='admin-notice'>
                        Voeg eerst <code>AUTH_SECRET</code>, <code>ADMIN_USERNAME</code> en{' '}
                        <code>ADMIN_PASSWORD_HASH</code> toe aan de environment-variabelen.
                    </div>
                ) : (
                    <form action={loginAction} className='admin-form'>
                        <label>
                            Gebruikersnaam
                            <input name='username' autoComplete='username' required />
                        </label>
                        <label>
                            Wachtwoord
                            <input name='password' type='password' autoComplete='current-password' required />
                        </label>
                        {error ? <p className='admin-error'>De gebruikersnaam of het wachtwoord klopt niet.</p> : null}
                        <button className='brand-button' type='submit'>
                            Inloggen
                        </button>
                    </form>
                )}
            </section>
        </main>
    );
};

export default LoginPage;


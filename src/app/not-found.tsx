import Link from 'next/link';

const NotFound = () => (
    <main className='font-brand flex min-h-screen flex-col items-center justify-center bg-[#FDF5E2] px-5 text-center text-[#15583B]'>
        <p className='section-kicker'>404</p>
        <h1 className='mt-3 max-w-xl text-4xl font-extrabold leading-tight sm:text-6xl'>
            Deze pagina bestaat niet (meer).
        </h1>
        <p className='mt-5 max-w-md text-base leading-7 sm:text-xl sm:leading-8'>
            Misschien is de pagina verplaatst, of klopt het adres niet helemaal.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-3'>
            <Link href='/' className='brand-button'>
                Naar de homepage
            </Link>
            <Link href='/projecten' className='brand-button brand-button--outline'>
                Bekijk projecten
            </Link>
        </div>
    </main>
);

export default NotFound;

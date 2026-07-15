const contactDetails = ['Maartje Bos', 'KvK 66418887', 'BTW NL002126942B60'];

const SiteFooter = () => (
    <footer className='bg-[#FDF5E2] px-5 py-6 text-[#15583B] sm:px-8 lg:px-10'>
        <div className='mx-auto flex max-w-7xl flex-col gap-4 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-wrap gap-x-5 gap-y-2'>
                {contactDetails.map((detail) => (
                    <span key={detail}>{detail}</span>
                ))}
            </div>
            <div className='flex flex-wrap gap-x-5 gap-y-2'>
                <a
                    className='text-[#E88A32] underline-offset-4 hover:underline'
                    href='mailto:maartje@ibubos.nl'>
                    maartje@ibubos.nl
                </a>
                <a
                    className='text-[#E88A32] underline-offset-4 hover:underline'
                    href='https://www.linkedin.com/in/maartjebos'
                    target='_blank'
                    rel='noreferrer'>
                    LinkedIn
                </a>
            </div>
        </div>
    </footer>
);

export default SiteFooter;

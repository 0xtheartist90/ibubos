import Link from 'next/link';

import { ContentSetupError, listAdminContent } from '@/lib/content/repository';

const AdminDashboard = async () => {
    try {
        const items = await listAdminContent();
        const blogs = items.filter((item) => item.type === 'blog');
        const projects = items.filter((item) => item.type === 'project');

        return (
            <>
                <div className='admin-title-row'>
                    <div>
                        <p className='section-kicker'>Dashboard</p>
                        <h1>Goedemiddag</h1>
                        <p>Beheer blogs en projecten vanuit één rustige plek.</p>
                    </div>
                </div>
                <div className='admin-stats'>
                    <Link href='/admin/blogs'><strong>{blogs.length}</strong><span>Blogs</span></Link>
                    <Link href='/admin/projecten'><strong>{projects.length}</strong><span>Projecten</span></Link>
                    <div><strong>{items.filter((item) => item.status === 'draft').length}</strong><span>Concepten</span></div>
                </div>
                <div className='admin-actions-grid'>
                    <Link href='/admin/blogs/new'>Nieuwe blog</Link>
                    <Link href='/admin/projecten/new'>Nieuw project</Link>
                </div>
            </>
        );
    } catch (error) {
        if (!(error instanceof ContentSetupError)) throw error;
        return <div className='admin-notice'><h1>Database koppelen</h1><p>{error.message}</p></div>;
    }
};

export default AdminDashboard;


import Link from 'next/link';

import ContentBrowser from '@/components/admin/ContentBrowser';
import { listAdminContent } from '@/lib/content/repository';

const AdminProjectsPage = async () => {
    const items = await listAdminContent('project');

return <><div className='admin-title-row'><div><p className='section-kicker'>Content</p><h1>Projecten</h1></div><Link className='brand-button' href='/admin/projecten/new'>Nieuw project</Link></div><ContentBrowser items={items} type='project' /></>;
};

export default AdminProjectsPage;


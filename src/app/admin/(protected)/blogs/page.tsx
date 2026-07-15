import Link from 'next/link';

import ContentTable from '@/components/admin/ContentTable';
import { listAdminContent } from '@/lib/content/repository';

const AdminBlogsPage = async () => {
    const items = await listAdminContent('blog');

return <><div className='admin-title-row'><div><p className='section-kicker'>Content</p><h1>Blogs</h1></div><Link className='brand-button' href='/admin/blogs/new'>Nieuwe blog</Link></div><ContentTable items={items} type='blog' /></>;
};

export default AdminBlogsPage;


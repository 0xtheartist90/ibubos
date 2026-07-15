import { notFound } from 'next/navigation';
import ContentEditor from '@/components/admin/ContentEditor';
import { getAdminContent } from '@/lib/content/repository';
type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; published?: string; error?: string }> };
const EditBlogPage = async ({ params, searchParams }: Props) => { const { id } = await params; const query = await searchParams; const item = await getAdminContent(id); if (!item || item.type !== 'blog') notFound(); return <ContentEditor type='blog' item={item} saved={query.saved === '1'} published={query.published === '1'} error={query.error} />; };
export default EditBlogPage;


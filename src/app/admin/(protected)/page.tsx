import Link from 'next/link';

import PlanningCalendar, { type PlannedItem } from '@/components/admin/PlanningCalendar';
import { ContentSetupError, listAdminContent } from '@/lib/content/repository';

const greeting = () => {
    const hour = Number(
        new Intl.DateTimeFormat('nl-NL', { hour: 'numeric', hour12: false, timeZone: 'Europe/Amsterdam' }).format(
            new Date()
        )
    );
    if (hour < 6) return 'Goedenacht';
    if (hour < 12) return 'Goedemorgen';
    if (hour < 18) return 'Goedemiddag';

    return 'Goedenavond';
};

const AdminDashboard = async () => {
    const todayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date());
    const [initialYear, initialMonth] = todayKey.split('-').map(Number);

    try {
        const items = await listAdminContent();
        const blogs = items.filter((item) => item.type === 'blog');
        const projects = items.filter((item) => item.type === 'project');
        const drafts = items.filter((item) => item.status === 'draft');
        const plannedItems: PlannedItem[] = items
            .filter((item) => item.plannedAt)
            .map((item) => ({
                id: item.id,
                type: item.type,
                status: item.status,
                title: item.title,
                planned: item.plannedAt!.toISOString().slice(0, 10)
            }));

        return (
            <>
                <div className='admin-title-row'>
                    <div>
                        <p className='section-kicker'>Dashboard</p>
                        <h1>{greeting()}</h1>
                        <p>Beheer blogs en projecten vanuit één rustige plek.</p>
                    </div>
                </div>
                <div className='admin-stats'>
                    <Link href='/admin/blogs'><strong>{blogs.length}</strong><span>Blogs</span></Link>
                    <Link href='/admin/projecten'><strong>{projects.length}</strong><span>Projecten</span></Link>
                    <div><strong>{drafts.length}</strong><span>{drafts.length === 1 ? 'Concept' : 'Concepten'}</span></div>
                </div>
                <div className='admin-actions-grid'>
                    <Link href='/admin/blogs/new'>+ Nieuwe blog</Link>
                    <Link href='/admin/projecten/new'>+ Nieuw project</Link>
                </div>
                <PlanningCalendar
                    plannedItems={plannedItems}
                    initialYear={initialYear}
                    initialMonth={initialMonth}
                    todayKey={todayKey}
                />
            </>
        );
    } catch (error) {
        if (!(error instanceof ContentSetupError)) throw error;

        return <div className='admin-notice'><h1>Database koppelen</h1><p>{error.message}</p></div>;
    }
};

export default AdminDashboard;

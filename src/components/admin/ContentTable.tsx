import Image from 'next/image';
import Link from 'next/link';

import type { ContentRecord, ContentType } from '@/lib/content/types';

const ContentTable = ({ items, type }: { items: ContentRecord[]; type: ContentType }) => {
    const base = type === 'blog' ? 'blogs' : 'projecten';

    return (
        <div className='admin-table-wrap'>
            <table className='admin-table'>
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Status</th>
                        <th>Bijgewerkt</th>
                        <th aria-label='Acties' />
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div className='admin-table__content'>
                                    <Image
                                        src={item.image}
                                        alt=''
                                        width={88}
                                        height={64}
                                        className='admin-table__thumbnail'
                                    />
                                    <div>
                                        <strong>{item.title}</strong>
                                        <span>/{item.slug}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className={`admin-status admin-status--${item.status}`}>
                                    {item.status === 'published' ? 'Gepubliceerd' : 'Concept'}
                                </span>
                            </td>
                            <td>{item.updatedAt.toLocaleDateString('nl-NL')}</td>
                            <td>
                                <Link href={`/admin/${base}/${item.id}`}>Bewerken</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!items.length ? <p className='admin-empty'>Nog geen content gevonden.</p> : null}
        </div>
    );
};

export default ContentTable;

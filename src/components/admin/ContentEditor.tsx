import Link from 'next/link';

import {
    deleteContentAction,
    publishContentAction,
    saveContentAction,
    unpublishContentAction
} from '@/lib/admin/actions';
import type { ContentRecord, ContentType } from '@/lib/content/types';

import AdminImageField from './AdminImageField';
import AdminSectionsField from './AdminSectionsField';

type EditorProps = {
    type: ContentType;
    item?: ContentRecord;
    saved?: boolean;
    published?: boolean;
    error?: string;
};

const ContentEditor = ({ type, item, saved, published, error }: EditorProps) => {
    const isBlog = type === 'blog';
    const base = isBlog ? 'blogs' : 'projecten';
    const saveAction = saveContentAction.bind(null, type, item?.id ?? null);

    return (
        <>
            <div className='admin-title-row'>
                <div>
                    <p className='section-kicker'>{item ? 'Bewerken' : 'Nieuw'}</p>
                    <h1>{item?.title ?? (isBlog ? 'Nieuwe blog' : 'Nieuw project')}</h1>
                    {item?.status === 'published' ? <p>Wijzigingen worden bij opslaan direct live gezet.</p> : null}
                </div>
                <Link href={`/admin/${base}`}>Terug naar overzicht</Link>
            </div>
            {saved ? <p className='admin-success'>Opgeslagen.</p> : null}
            {published ? <p className='admin-success'>De content staat nu live.</p> : null}
            {error === 'slug' ? <p className='admin-error'>Deze URL wordt al gebruikt. Kies een andere slug.</p> : null}
            {error === 'validation' ? <p className='admin-error'>Controleer de verplichte velden en de lengte van de teksten.</p> : null}
            <form action={saveAction} className='admin-form admin-editor'>
                <div className='admin-form-grid'>
                    <label>Titel<input name='title' defaultValue={item?.title} required /></label>
                    <label>Categorie<input name='label' defaultValue={item?.label} required /></label>
                </div>
                <label>Samenvatting<textarea name='summary' defaultValue={item?.description ?? item?.intro} required /></label>
                <AdminImageField defaultValue={item?.image ?? (isBlog ? '/images/over%20ibu.webp' : '/images/lokaalgeld.webp')} />
                {isBlog ? (
                    <label>Kern<textarea name='takeaway' defaultValue={item?.takeaway ?? ''} required /></label>
                ) : (
                    <div className='admin-form-grid'>
                        <label>Feiten, één per regel<textarea name='facts' defaultValue={item?.facts?.join('\n') ?? ''} required /></label>
                        <label>Resultaat<textarea name='outcome' defaultValue={item?.outcome ?? ''} required /></label>
                    </div>
                )}
                <AdminSectionsField initialSections={item?.sections ?? []} />
                <button className='brand-button' type='submit'>{item ? 'Wijzigingen opslaan' : 'Opslaan als concept'}</button>
            </form>
            {item ? (
                <div className='admin-danger-zone'>
                    {item.status === 'draft' ? (
                        <form action={publishContentAction.bind(null, type, item.id)}><button className='brand-button' type='submit'>Publiceren</button></form>
                    ) : (
                        <form action={unpublishContentAction.bind(null, type, item.id)}><button type='submit'>Offline halen</button></form>
                    )}
                    <form action={deleteContentAction.bind(null, type, item.id)} className='admin-delete-form'>
                        <label><input type='checkbox' name='confirm' value='yes' required /> Ik weet dat dit definitief is</label>
                        <button className='admin-delete' type='submit'>Verwijderen</button>
                    </form>
                </div>
            ) : null}
        </>
    );
};

export default ContentEditor;

'use client';

import { useRef, useState } from 'react';

const AdminImageField = ({ defaultValue }: { defaultValue: string }) => {
    const [image, setImage] = useState(defaultValue);
    const [failed, setFailed] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInput = useRef<HTMLInputElement>(null);

    const uploadImage = async () => {
        const file = fileInput.current?.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadError('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
            const result = (await response.json()) as { url?: string; error?: string };
            if (!response.ok || !result.url) throw new Error(result.error ?? 'Upload mislukt.');

            setImage(result.url);
            setFailed(false);
        } catch (error) {
            setUploadError(error instanceof Error ? error.message : 'Upload mislukt.');
        } finally {
            setUploading(false);
            if (fileInput.current) fileInput.current.value = '';
        }
    };

    return (
        <div className='admin-image-field'>
            <label>
                Afbeelding
                <input
                    name='image'
                    value={image}
                    onChange={(event) => {
                        setImage(event.target.value);
                        setFailed(false);
                    }}
                    required
                />
            </label>
            <div className='admin-image-upload'>
                <input ref={fileInput} type='file' accept='image/jpeg,image/png,image/webp' />
                <button type='button' onClick={uploadImage} disabled={uploading}>
                    {uploading ? 'Uploaden...' : 'Afbeelding uploaden'}
                </button>
            </div>
            {uploadError ? <p className='admin-image-error'>{uploadError}</p> : null}
            <div className='admin-image-preview'>
                {image && !failed ? (
                    <img src={image} alt='Voorbeeld van de gekozen afbeelding' onError={() => setFailed(true)} />
                ) : (
                    <span>Geen geldige afbeelding</span>
                )}
            </div>
        </div>
    );
};

export default AdminImageField;

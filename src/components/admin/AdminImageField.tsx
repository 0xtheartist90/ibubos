'use client';

import { useState } from 'react';

const AdminImageField = ({ defaultValue }: { defaultValue: string }) => {
    const [image, setImage] = useState(defaultValue);
    const [failed, setFailed] = useState(false);

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

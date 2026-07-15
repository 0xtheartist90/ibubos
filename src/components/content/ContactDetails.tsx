'use client';

import { useState } from 'react';

import { Check, Copy, Mail, Phone } from 'lucide-react';

const EMAIL = 'maartje@ibubos.nl';
const PHONE_DISPLAY = '06 19 03 96 45';
const PHONE_LINK = '+31619039645';

const ContactDetails = () => {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <dl className='contact-details'>
            <div className='contact-details__row'>
                <dt>
                    <Mail aria-hidden className='h-5 w-5' />
                    E-mail
                </dt>
                <dd>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    <button type='button' onClick={copyEmail} className='contact-details__copy'>
                        {copied ? <Check aria-hidden className='h-4 w-4' /> : <Copy aria-hidden className='h-4 w-4' />}
                        {copied ? 'Gekopieerd' : 'Kopieer'}
                    </button>
                </dd>
            </div>
            <div className='contact-details__row'>
                <dt>
                    <Phone aria-hidden className='h-5 w-5' />
                    Telefoon
                </dt>
                <dd>
                    <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
                </dd>
            </div>
        </dl>
    );
};

export default ContactDetails;

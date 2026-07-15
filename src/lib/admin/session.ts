import { createHmac, timingSafeEqual } from 'node:crypto';

const assertSecret = (secret: string) => {
    if (secret.length < 32) throw new Error('AUTH_SECRET moet minimaal 32 tekens bevatten.');
};

const sign = (payload: string, secret: string) =>
    createHmac('sha256', secret).update(payload).digest('base64url');

export const createSessionToken = (secret: string, now = new Date(), lifetimeSeconds = 60 * 60 * 12) => {
    assertSecret(secret);
    const payload = Buffer.from(JSON.stringify({ exp: now.getTime() + lifetimeSeconds * 1000 })).toString('base64url');

return `${payload}.${sign(payload, secret)}`;
};

export const verifySessionToken = (token: string, secret: string, now = new Date()) => {
    try {
        assertSecret(secret);
        const [payload, signature] = token.split('.');
        if (!payload || !signature) return false;

        const expected = Buffer.from(sign(payload, secret));
        const supplied = Buffer.from(signature);
        if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return false;

        const value = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };

return typeof value.exp === 'number' && value.exp > now.getTime();
    } catch {
        return false;
    }
};


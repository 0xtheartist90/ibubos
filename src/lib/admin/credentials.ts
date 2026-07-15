import { randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;

const safeEqual = (left: string, right: string) => {
    const a = Buffer.from(left);
    const b = Buffer.from(right);
    return a.length === b.length && timingSafeEqual(a, b);
};

export const hashPassword = (password: string, salt: string = randomUUID()) => {
    const derived = scryptSync(password, salt, KEY_LENGTH).toString('base64url');
    return `scrypt$${salt}$${derived}`;
};

export const verifyCredentials = (
    username: string,
    password: string,
    expectedUsername: string,
    passwordHash: string
) => {
    const [, salt = 'invalid-salt', expected = ''] = passwordHash.split('$');
    const actual = scryptSync(password, salt, KEY_LENGTH).toString('base64url');
    return safeEqual(username, expectedUsername) && safeEqual(actual, expected);
};

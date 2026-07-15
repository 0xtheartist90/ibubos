import assert from 'node:assert/strict';
import test from 'node:test';

import { hashPassword, verifyCredentials } from '../src/lib/admin/credentials.ts';
import { createSessionToken, verifySessionToken } from '../src/lib/admin/session.ts';

test('hashes and verifies the shared admin password', () => {
    const hash = hashPassword('een-sterk-wachtwoord', 'vaste-test-salt');
    assert.equal(verifyCredentials('admin', 'een-sterk-wachtwoord', 'admin', hash), true);
    assert.equal(verifyCredentials('admin', 'verkeerd', 'admin', hash), false);
    assert.equal(verifyCredentials('anders', 'een-sterk-wachtwoord', 'admin', hash), false);
});

test('accepts valid signed sessions and rejects tampering or expiry', () => {
    const now = new Date('2026-01-01T12:00:00Z');
    const token = createSessionToken('minimaal-32-karakters-lang-geheim', now, 3600);

    assert.equal(verifySessionToken(token, 'minimaal-32-karakters-lang-geheim', now), true);
    assert.equal(verifySessionToken(`${token}x`, 'minimaal-32-karakters-lang-geheim', now), false);
    assert.equal(
        verifySessionToken(token, 'minimaal-32-karakters-lang-geheim', new Date('2026-01-01T13:00:01Z')),
        false
    );
});

test('rejects weak session secrets', () => {
    assert.throws(() => createSessionToken('te-kort', new Date(), 3600), /32 tekens/);
});

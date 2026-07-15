import { hashPassword } from '../src/lib/admin/credentials.ts';

const password = process.argv[2];
if (!password || password.length < 12) {
    console.error('Gebruik: npm run auth:hash -- "een-wachtwoord-van-minimaal-12-tekens"');
    process.exitCode = 1;
} else {
    console.log(hashPassword(password));
}


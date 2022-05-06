const { totp } = require('otplib');

const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
totp.options = { algorithm: 'sha256', step: 60 }
const token = totp.generate(secret);
// const isValid = totp.check(token, secret);
const isValid = totp.verify({ token, secret });

console.log(isValid)
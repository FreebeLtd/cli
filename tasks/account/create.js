const StellarSdk = require('../../config').StellarSdk;
const out = require('../../lib/output');

const kp = StellarSdk.Keypair.random();

out.info('Public Key');
console.info(kp.publicKey());
out.warn('Secret Key');
console.info(kp.secret());

const StellarSdk = require('../../config').StellarSdk;
const kp = StellarSdk.Keypair.random();

console.info('Public:');
console.info(kp.publicKey());
console.info('Secret:');
console.info(kp.secret());

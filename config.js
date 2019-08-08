const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
// StellarSdk.Network.usePublicNetwork();

let issuerCredentials = null;
let distributorCredentials = null;
let cnyCredentials = null;
let ngnCredentials = null;


try {
  issuerCredentials = require('./.credentials_issuer');
} catch (e) {
  console.warn('No issuer credentials found.');
}

try {
  distributorCredentials = require('./.credentials_distributor');
} catch (e) {
  console.warn('No distributor credentials found.');
}

try {
  cnyCredentials = require('./.credentials_cny');
} catch (e) {
  console.warn('No cny credentials found.');
}

try {
  ngnCredentials = require('./.credentials_ngn');
} catch (e) {
  console.warn('No ngn credentials found.');
}

let issuer = null;
let distributor = null;
let cnyAccount = null;
let ngnAccount = null;

if (issuerCredentials && issuerCredentials.secret) {
  issuer = StellarSdk.Keypair.fromSecret(issuerCredentials.secret);
} else if (issuerCredentials) {
  issuer = StellarSdk.Keypair.fromPublicKey(issuerCredentials.public);
}

if (distributorCredentials && distributorCredentials.secret) {
  distributor = StellarSdk.Keypair.fromSecret(distributorCredentials.secret);
} else if (distributorCredentials) {
  distributor = StellarSdk.Keypair.fromPublicKey(distributorCredentials.public);
}

if (cnyCredentials && cnyCredentials.secret) {
  cnyAccount = StellarSdk.Keypair.fromSecret(cnyCredentials.secret);
} else if (cnyCredentials) {
  cnyAccount = StellarSdk.Keypair.fromPublicKey(cnyCredentials.public);
}

if (ngnCredentials && ngnCredentials.secret) {
  ngnAccount = StellarSdk.Keypair.fromSecret(ngnCredentials.secret);
} else if (ngnCredentials) {
  ngnAccount = StellarSdk.Keypair.fromPublicKey(ngnCredentials.public);
}

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

module.exports = {
  server,
  issuer,
  distributor,
  cnyAccount,
  ngnAccount,
  StellarSdk
};

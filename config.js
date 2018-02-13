const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

const assetCode = 'MOPS';

let issuerCredentials = null;
let distributorCredentials = null;

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

let issuer = null;
let distributor = null;

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

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const asset = new StellarSdk.Asset(assetCode, issuer.publicKey());

module.exports = {
  server,
  asset,
  issuer,
  distributor,
  StellarSdk
};

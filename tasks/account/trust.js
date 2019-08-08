const { StellarSdk } = require('../../config');
const { promptPrivateKey, promptAsset } = require('../../lib/input');
const out = require('../../lib/output');
const { trustAccount } = require('../../lib/transactions');

const privateKey = promptPrivateKey();
const receiver = StellarSdk.Keypair.fromSecret(privateKey);

const asset = promptAsset("trust")

trustAccount(receiver, asset)
  .then(() => {
    out.success('Account now trusts the issuer for the asset');
  })
  .catch(error => out.error('Error trusting account!', error));

const { StellarSdk } = require('../config');
const { promptPrivateKey } = require('../../lib/input');
const out = require('../../lib/output');
const { trustAccount } = require('../../lib/transactions');

const privateKey = promptPrivateKey();
const receiver = StellarSdk.Keypair.fromSecret(privateKey);

trustAccount(receiver)
  .then(() => {
    out.success('Account now trusts the issuer for the asset');
  })
  .catch(error => out.error('Error trusting account!', error));

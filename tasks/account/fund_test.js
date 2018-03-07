const { fundAccount } = require('../../lib/friendbot');
const { promptPublicKey } = require('../../lib/input');
const out = require('../../lib/output');

const publicKey = promptPublicKey();

fundAccount(publicKey)
  .then(msg => out.success('Account was funded!', msg))
  .catch(error => out.error('Error while funding account!', error));

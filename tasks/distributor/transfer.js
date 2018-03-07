const { promptAssetAmount, promptPublicKey } = require('../../lib/input');
const { transferAssets } = require('../../lib/transactions');
const out = require('../../lib/output');
const { StellarSdk, asset, distributor, server } = require('../../config');

const publicKey = promptPublicKey();
const receiver = StellarSdk.Keypair.fromPublicKey(publicKey);
const amount = promptAssetAmount();

if (amount !== false) {
  transferAssets(receiver, amount)
    .then(() => out.success(`Successfully transfered ${amount} ${asset.code}.`))
    .catch(error => out.error('Error transferring coins to account', error));
}

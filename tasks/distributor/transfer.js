const { promptAsset, promptAssetAmount, promptPublicKey } = require('../../lib/input');
const { transferAssets } = require('../../lib/transactions');
const out = require('../../lib/output');
const { StellarSdk } = require('../../config');

const publicKey = promptPublicKey();
const receiver = StellarSdk.Keypair.fromPublicKey(publicKey);

const asset = promptAsset("transfer")
const amount = promptAssetAmount(asset);

if (amount !== false) {
  transferAssets(receiver, asset, amount)
    .then(() => out.success(`Successfully transfered ${amount} ${asset.code}.`))
    .catch(error => out.error('Error transferring coins to account', error));
}

const { promptAssetAmount, promptPublicKey } = require('../../lib/input');
const { buildPayment } = require('../../lib/transactions');
const out = require('../../lib/output');
const { StellarSdk, asset, distributor, server } = require('../../config');

const transferAssets = async (receiver, amount) => {
  const distributorAccount = await server.loadAccount(distributor.publicKey());
  out.progress('Distributor account loaded');

  const transaction = buildPayment({
    amount,
    receiver,
    sender: distributor,
    senderAccount: distributorAccount
  });

  out.progress('Submitting transaction');
  return server.submitTransaction(transaction);
};

const publicKey = promptPublicKey();
const receiver = StellarSdk.Keypair.fromPublicKey(publicKey);
const amount = promptAssetAmount();

if (amount !== false) {
  transferAssets(receiver, amount)
    .then(() => out.success(`Successfully transfered ${amount} ${asset.code}.`))
    .catch(error => out.error('Error transferring coins to account', error));
}

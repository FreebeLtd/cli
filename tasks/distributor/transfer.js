const { promptAssetAmount, promptPublicKey } = require('../../lib/input');
const out = require('../../lib/output');
const { StellarSdk, asset, distributor, server } = require('../../config');

const transferAssets = async (receiver, amount) => {
  const distributorAccount = await server.loadAccount(distributor.publicKey());
  out.progress('Distributor account loaded');

  const transaction = new StellarSdk.TransactionBuilder(distributorAccount)
    .addOperation(
      StellarSdk.Operation.payment({
        asset,
        amount,
        destination: receiver.publicKey()
      })
    )
    .build();
  transaction.sign(distributor);

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

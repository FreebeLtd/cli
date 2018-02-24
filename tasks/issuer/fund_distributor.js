const { promptAssetAmount } = require('../../lib/input');
const out = require('../../lib/output');
const {
  StellarSdk,
  asset,
  issuer,
  distributor,
  server
} = require('../../config');

const transferAssets = async amount => {
  const issuerAccount = await server.loadAccount(issuer.publicKey());
  out.progress('Issuer account loaded');

  const transaction = new StellarSdk.TransactionBuilder(issuerAccount)
    .addOperation(
      StellarSdk.Operation.payment({
        asset,
        amount,
        destination: distributor.publicKey()
      })
    )
    .build();
  transaction.sign(issuer);

  out.progress('Submitting transaction');
  return server.submitTransaction(transaction);
};

const amount = promptAssetAmount();

if (amount !== false) {
  transferAssets(amount)
    .then(() => {
      const msg = `Transfered ${amount} ${asset.code} to distributor.`;
      out.success(msg);
    })
    .catch(error => out.error('Error funding distributor', error));
}

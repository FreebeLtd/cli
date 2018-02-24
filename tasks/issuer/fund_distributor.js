const { promptAssetAmount } = require('../../lib/input');
const { buildPayment } = require('../../lib/transactions');
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

  const transaction = buildPayment({
    amount,
    receiver: distributor,
    sender: issuer,
    senderAccount: issuerAccount
  });

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

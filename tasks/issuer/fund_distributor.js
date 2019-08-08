const { promptAsset, promptAssetAmount } = require('../../lib/input');
const { buildPayment } = require('../../lib/transactions');
const out = require('../../lib/output');
const {
  issuer,
  distributor,
  server
} = require('../../config');


const transferAssets = async (asset, amount) => {
  const issuerAccount = await server.loadAccount(issuer.publicKey());
  out.progress('Issuer account loaded');

  const transaction = buildPayment({
    asset,
    amount,
    receiver: distributor,
    sender: issuer,
    senderAccount: issuerAccount
  });

  out.progress('Submitting transaction');
  return server.submitTransaction(transaction);
};

const asset = promptAsset("fund")
const amount = promptAssetAmount(asset);

if (asset && amount !== false) {
  transferAssets(assset, amount)
    .then(() => {
      const msg = `Transfered ${amount} ${asset.code} to distributor.`;
      out.success(msg);
    })
    .catch(error => out.error('Error funding distributor', error));
}

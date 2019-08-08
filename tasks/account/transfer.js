const out = require('../../lib/output');
const { buildPayment } = require('../../lib/transactions');
const { StellarSdk, server } = require('../../config');
const {
  promptAsset,
  promptAssetAmount,
  promptPublicKey,
  promptPrivateKey
} = require('../../lib/input');

const transferAssets = async (sender, receiver, amount) => {
  const senderAccount = await server.loadAccount(sender.publicKey());
  out.progress('Sender account loaded');

  const transaction = buildPayment({
    amount,
    receiver,
    sender,
    senderAccount
  });

  out.progress('Submitting transaction');
  return server.submitTransaction(transaction);
};

const asset = promptAsset("transfer")

out.info('Enter the PUBLIC key of the RECEIVER');
const publicKey = promptPublicKey();
const receiver = StellarSdk.Keypair.fromPublicKey(publicKey);

out.info('Enter the PRIVATE key of the SENDER');
const privateKey = promptPrivateKey();
const sender = StellarSdk.Keypair.fromSecret(privateKey);

out.info('Enter the amount to transfer');
const amount = promptAssetAmount(asset);

if (amount !== false) {
  transferAssets(sender, receiver, amount)
    .then(() => out.success(`Successfully transfered ${amount} ${asset.code}.`))
    .catch(error => out.error('Error transferring coins to account', error));
}

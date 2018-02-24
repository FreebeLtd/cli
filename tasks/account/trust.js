const { promptPrivateKey } = require('../../lib/input');
const out = require('../../lib/output');
const { StellarSdk, asset, server } = require('../../config');

const privateKey = promptPrivateKey();
const receiver = StellarSdk.Keypair.fromSecret(privateKey);

const trustAccount = async () => {
  const receiverAccount = await server.loadAccount(receiver.publicKey());
  out.progress('Receiver account loaded');

  const transaction = new StellarSdk.TransactionBuilder(receiverAccount)
    .addOperation(StellarSdk.Operation.changeTrust({ asset }))
    .build();

  transaction.sign(receiver);
  out.progress('Submitting changeTrust operation');

  return await server.submitTransaction(transaction);
};

trustAccount()
  .then(() => {
    out.success('Account now trusts the issuer for the asset');
  })
  .catch(error => out.error('Error trusting account!', error));

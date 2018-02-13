const { promptPrivateKey } = require('../../lib/input');
const { StellarSdk, asset, issuer, server } = require('../../config');

const privateKey = promptPrivateKey();
const receiver = StellarSdk.Keypair.fromSecret(privateKey);

server
  .loadAccount(receiver.publicKey())
  .then(receiverAccount => {
    console.info('Receiver account loaded');

    const transaction = new StellarSdk.TransactionBuilder(receiverAccount)
      .addOperation(StellarSdk.Operation.changeTrust({ asset }))
      .build();

    transaction.sign(receiver);
    console.info('Submitting changeTrust operation...');
    return server.submitTransaction(transaction);
  })
  .then(response => {
    console.log('Account now trusts the issuer for the asset.');
  })
  .catch(function(error) {
    console.error('Error!', error);
    console.dir(error);
  });

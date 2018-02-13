const { promptAssetAmount, promptPublicKey } = require('../../lib/input');
const { StellarSdk, asset, distributor, server } = require('../../config');

const transferAssets = (receiver, amount) => {
  server
    .loadAccount(distributor.publicKey())
    .then(distributorAccount => {
      console.info('Distributor account loaded');

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

      return server.submitTransaction(transaction);
    })
    .then(response => {
      console.log(`Successfully transfered ${amount} of coins to receiver.`);
    })
    .catch(function(error) {
      console.error('Error!', error);
      console.dir(error);
    });
};

const publicKey = promptPublicKey();
const receiver = StellarSdk.Keypair.fromPublicKey(publicKey);
const amount = promptAssetAmount();

if (amount !== false) {
  transferAssets(receiver, amount);
}

const { promptAssetAmount } = require('../../lib/input');
const {
  StellarSdk,
  asset,
  issuer,
  distributor,
  server
} = require('../../config');

const transferAssets = amount => {
  server
    .loadAccount(issuer.publicKey())
    .then(issuerAccount => {
      console.info('Issuer account loaded');

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

      return server.submitTransaction(transaction);
    })
    .then(response => {
      console.log(`Successfully transfered ${amount} of coins to distributor.`);
    })
    .catch(function(error) {
      console.error('Error!', error);
      console.dir(error);
    });
};

const amount = promptAssetAmount();

if (amount !== false) {
  transferAssets(amount);
}

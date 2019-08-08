const { StellarSdk, server } = require('../../config');
const { promptAsset, promptPrivateKey, promptAmount } = require('../../lib/input')
const out = require('../../lib/output');

out.info('Enter the PRIVATE key of the BUYER');
const privateKey = promptPrivateKey();
const buyer = StellarSdk.Keypair.fromSecret(privateKey);

const assetToBuy = promptAsset("bought")
const assetToSell = promptAsset("sold")
const assetAmount = promptAmount(assetToBuy, "buy")

server.loadAccount(buyer.publicKey())
  .then(function(account) {
    var transaction = new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageOffer({
        selling: assetToSell,
        buying: assetToBuy,
        amount: `${assetAmount}`,
        price: '1.0'
      }))
      .build();

    transaction.sign(buyer);

    // console.log(transaction.toEnvelope().toXDR('base64'));
    server.submitTransaction(transaction)
      .then(function(transactionResult) {
        // console.log(JSON.stringify(transactionResult, null, 2));
        out.success('\nSuccess! View the transaction at: ', transactionResult._links.transaction.href);
      })
      .catch(function(err) {
        out.error('An error has occured:', err);
      });
  })
  .catch(function(e) {
    out.error('', e);
  });
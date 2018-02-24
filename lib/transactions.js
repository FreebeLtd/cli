const { StellarSdk, asset } = require('../config');

const buildPayment = ({ sender, senderAccount, receiver, amount }) => {
  const payment = StellarSdk.Operation.payment({
    asset,
    amount,
    destination: receiver.publicKey()
  });

  const transaction = new StellarSdk.TransactionBuilder(senderAccount)
    .addOperation(payment)
    .build();

  transaction.sign(sender);

  return transaction;
};

module.exports = { buildPayment };

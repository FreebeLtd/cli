const { StellarSdk, asset, distributor, server } = require('../config');
const out = require('./output');

const trustAccount = async receiver => {
  const receiverAccount = await server.loadAccount(receiver.publicKey());
  out.progress('Receiver account loaded');

  const transaction = new StellarSdk.TransactionBuilder(receiverAccount)
    .addOperation(StellarSdk.Operation.changeTrust({ asset }))
    .build();

  transaction.sign(receiver);
  out.progress('Submitting changeTrust operation');

  return await server.submitTransaction(transaction);
};

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

const transferAssets = async (receiver, amount) => {
  const distributorAccount = await server.loadAccount(distributor.publicKey());
  out.progress('Distributor account loaded');

  const transaction = buildPayment({
    amount,
    receiver,
    sender: distributor,
    senderAccount: distributorAccount
  });

  out.progress('Submitting transaction');
  return server.submitTransaction(transaction);
};

module.exports = { trustAccount, buildPayment, transferAssets };

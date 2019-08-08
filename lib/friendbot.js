const request = require('request');
const { StellarSdk, issuer, server } = require('../config');

const fundAccount = publicKey => {
  const options = {
    url: 'https://friendbot.stellar.org',
    qs: { addr: publicKey },
    json: true
  };

  const sendRequest = (resolve, reject) => {
    request.get(options, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error || body);
      } else {
        resolve(body);
      }
    });
  };

  return new Promise(sendRequest);
};

const createAccount = (amount) => { 
  const destination = StellarSdk.Keypair.random()

  server.accounts()
  .accountId(issuer.publicKey())
  .call()
  .then(({ sequence }) => {
    const account = new StellarSdk.Account(issuer.publicKey(), sequence)
    const transaction = new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.createAccount({
        destination: destination.publicKey(),
        startingBalance: `${amount}`
      }))
      .build()
    transaction.sign(StellarSdk.Keypair.fromSecret(issuer.secret()))
    return server.submitTransaction(transaction)
  })
  .then(results => {
    console.log('Transaction', results._links.transaction.href)
    console.log('New Keypair', destination.publicKey(), destination.secret())
  })

}

module.exports = { fundAccount };

const { promptPublicKey } = require('../../lib/input');
const { StellarSdk, server } = require('../../config');

const publicKey = promptPublicKey();
const kp = StellarSdk.Keypair.fromPublicKey(publicKey);

const printableAttributes = [
  'from',
  'to',
  'starting_balance',
  'funder',
  'asset_code',
  'asset_type',
  'amount'
];

const printRecord = record => {
  console.info(`Type: ${record.type} from ${record.created_at}`);

  const printable = printableAttributes.reduce((acc, attr) => {
    if (record[attr]) {
      acc[attr] = record[attr];
    }
    return acc;
  }, {});

  console.dir(printable);
  console.info(`Link: ${record._links.self.href}`);
};

server
  .loadAccount(kp.publicKey())
  .then(account => {
    console.log('Balances for account');
    account.balances.forEach(function(balance) {
      console.log(
        `Type: ${balance.asset_code || balance.asset_type} - Balance: ${
          balance.balance
        }`
      );
    });

    console.log('Last operations for account');
    return server
      .operations()
      .forAccount(kp.publicKey())
      .call();
  })
  .then(function(page) {
    page.records.forEach(record => printRecord(record));
    return page.next();
  })
  .then(function(page) {
    page.records.forEach(record => printRecord(record));
    return page.next();
  })
  .then(function(page) {
    page.records.forEach(record => printRecord(record));
  })
  .catch(error => {
    console.error('Error loading account!');
    console.dir(error);
  });

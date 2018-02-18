const Table = require('cli-table');
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

const printBalances = balances => {
  const table = new Table();

  balances.forEach(function(balance) {
    const key = `${balance.asset_code || balance.asset_type}`;
    const obj = {};
    obj[key] = balance.balance;
    table.push(obj);
  });

  console.log(table.toString());
};

const printRecords = records => {
  records.forEach(record => printRecord(record));
};

const printRecord = record => {
  const table = new Table();
  table.push({ Type: record.type });
  table.push({ Date: record.created_at });

  printableAttributes.forEach(attr => {
    if (record[attr]) {
      const obj = {};
      obj[attr] = record[attr];
      table.push(obj);
    }
  });

  table.push({ Link: record._links.self.href });
  console.log(table.toString());
};

const loadAccount = async () => {
  const account = await server.loadAccount(kp.publicKey());
  const page1 = await server
    .operations()
    .forAccount(kp.publicKey())
    .call();
  const page2 = await page1.next();
  const page3 = await page2.next();
  const records = page1.records.concat(page2.records, page3.records);

  return { account, records };
};

loadAccount()
  .then(({ account, records }) => {
    console.log('Balances for account');
    printBalances(account.balances);

    console.log('Last operations for account');
    printRecords(records);
  })
  .catch(error => {
    console.error('Error loading account!');
    console.dir(error);
  });

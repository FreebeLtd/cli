const request = require('request');
const { promptPublicKey } = require('../../lib/input');
const out = require('../../lib/output');

const publicKey = promptPublicKey();
const options = {
  url: 'https://horizon-testnet.stellar.org/friendbot',
  qs: { addr: publicKey },
  json: true
};

request.get(options, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    out.error('Error while funding Account!', error || body);
  } else {
    out.success('Account was funded!');
  }
});

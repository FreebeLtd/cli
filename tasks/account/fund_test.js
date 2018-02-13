const { promptPublicKey } = require('../../lib/input');
const request = require('request');

const publicKey = promptPublicKey();

request.get(
  {
    url: 'https://horizon-testnet.stellar.org/friendbot',
    qs: { addr: publicKey },
    json: true
  },
  (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.error('ERROR!', error || body);
    } else {
      console.log('The account was founded by friendbot!');
    }
  }
);

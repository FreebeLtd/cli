const request = require('request');

const fundAccount = publicKey => {
  const options = {
    url: 'https://horizon-testnet.stellar.org/friendbot',
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

module.exports = { fundAccount };

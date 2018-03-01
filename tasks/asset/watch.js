const { server, asset } = require('../../config');
const out = require('../../lib/output');

out.info('Watching out for Asset ' + asset.code);

const renderInfo = response => {
  if (response.asset_code === asset.code) {
    console.log('--+--[ ' + response.asset_code + ' ]');
    console.log('  |');
    console.log('  +->  Account: ' + response.account);
    console.log('  +->  Issuer:  ' + response.asset_issuer);
    console.log('  +->  Type:    ' + response.type);
    console.log('  +->  Amount:  ' + response.amount);
    console.log();
  }
};

server
  .effects()
  .cursor('now')
  .stream({
    onmessage: function(response) {
      renderInfo(response);
    }
  });

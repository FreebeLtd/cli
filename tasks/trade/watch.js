const { server } = require('../../config');
const { promptAsset } = require('../../lib/input')
const out = require('../../lib/output');

const fromAsset = promptAsset('from');
const toAsset = promptAsset('to');

out.info(`Watching out for trade from ${fromAsset.code} to ${toAsset.code}`);

server
    .orderbook(fromAsset, toAsset)
  .trades()
  .call()
  .then(function(resp) { console.log(resp); })
  .catch(function(err) { console.log(err); })
const { StellarSdk, asset, server } = require('../../config');
const { fundAccount } = require('../../lib/friendbot');
const { transferAssets, trustAccount } = require('../../lib/transactions');
const { promptAssetAmount, promptPublicKey } = require('../../lib/input');
const out = require('../../lib/output');

const createAccount = async amount => {
  const newKeypair = StellarSdk.Keypair.random();
  out.progress('Request funding of account');

  try {
    const fundResponse = await fundAccount(newKeypair.publicKey());
    out.progress('Funded account on testnet');
  } catch (error) {
    return out.error(error);
  }

  try {
    await trustAccount(newKeypair);
    out.progress('Account now trusts the issuer for the asset');
  } catch (error) {
    return out.error('Error trusting account!', error);
  }

  try {
    await transferAssets(newKeypair, amount);
    out.progress(`Successfully transfered ${amount} ${asset.code}.`);
  } catch (e) {
    return out.error('Error transferring coins to account', error);
  }

  return newKeypair;
};

const amount = promptAssetAmount();

if (amount !== false) {
  createAccount(amount)
    .then(newKeypair => {
      out.secretAsQR(newKeypair.secret());
      out.success('Account was created and funded!');
      out.info('Public Key');
      out.info(newKeypair.publicKey());
      out.warn('Secret Key');
      out.warn(newKeypair.secret());
      out.info('Use the camera to scan the QR code of the secret');
    })
    .catch(error => out.error(error));
}

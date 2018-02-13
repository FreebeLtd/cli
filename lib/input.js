const readlineSync = require('readline-sync');
const { StellarSdk } = require('../config');
const { StrKey } = StellarSdk;

const chomp = str => str.replace(/\n|\r| /g, '');

const promptPrivateKey = () => {
  const key = readlineSync.question('Enter private key: ', {
    hideEchoBack: true
  });
  const chomped = chomp(key);

  if (!StrKey.isValidEd25519SecretSeed(chomped)) {
    throw new Error('This does not look like a private key!');
  }

  return chomped;
};

const promptPublicKey = () => {
  const key = readlineSync.question('Enter public key: ');
  const chomped = chomp(key);

  if (!StrKey.isValidEd25519PublicKey(chomped)) {
    throw new Error('This does not look like a public key!');
  }

  return chomped;
};

const promptAssetAmount = () => {
  const amount = readlineSync.question('Enter coin amount to transfer: ');
  const question = `Do you really want to transer ${amount} assets?`;

  const confirmation = readlineSync.keyInYNStrict(question);

  if (confirmation) {
    return amount;
  } else {
    return false;
  }
};

module.exports = { promptAssetAmount, promptPrivateKey, promptPublicKey };

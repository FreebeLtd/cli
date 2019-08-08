const readlineSync = require('readline-sync');
const { StellarSdk, issuer } = require('../config');
const { StrKey } = StellarSdk;

const chomp = str => str.replace(/\n|\r| /g, '');
const acceptedAssetCode = ['NGN', 'CNY'];

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

const promptAssetCode = (question = `Enter asset code: `) => {
  const assetCode = readlineSync.question(
    question
  );
  if (!acceptedAssetCode.includes(assetCode)) {
    throw new Error(`AssetCode must be one of ${acceptedAssetCode.toString()}`)
  }
  return assetCode
};

const promptAssetAmount = (asset) => {
  const amount = readlineSync.question(
    `Enter amount of ${asset.code} to transfer: `
  );
  const question = `Do you really want to transfer ${amount} of ${asset.code}?`;

  const confirmation = readlineSync.keyInYNStrict(question);

  if (confirmation) {
    return amount;
  } else {
    return false;
  }
};

const promptAsset = (purpose) => {
  return new StellarSdk.Asset(promptAssetCode(`Enter ${purpose} asset code: `), issuer.publicKey());
}

const promptAmount = (asset, purpose) => {
  const amount = readlineSync.question(
    `Enter amount of ${asset.code} to ${purpose}: `
  );

  if(isNaN(amount)) throw new Error('Amount has to be a number')

  return amount;
};

module.exports = { promptAsset, promptAssetCode, promptAmount, promptAssetAmount, promptPrivateKey, promptPublicKey };

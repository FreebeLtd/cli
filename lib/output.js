const chalk = require('chalk');

const successFmt = chalk.bold.green;
const infoFmt = chalk.bold.cyan;
const progressFmt = chalk.white;
const errorFmt = chalk.bold.red;
const warningFmt = chalk.keyword('orange');

const success = message => {
  console.log('✅  ' + successFmt(message));
};

const info = message => {
  console.log('💡  ' + infoFmt(message));
};

const progress = message => {
  console.log('* ' + progressFmt(message));
};

const warn = message => {
  console.warn('⚠️  ' + warningFmt(message));
};

const error = (message, errorObj) => {
  console.error('⛔  ' + errorFmt(message));
  if (errorObj) console.dir(errorObj);
};

module.exports = { success, info, progress, warn, error };

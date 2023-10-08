'use strict';

function ck () {
  Promise.resolve().then(function () { return require('./utils-6Ct3liTC.js'); }).then(({ default: utils }) =>
    console.log(utils.add(1, 2))
  );
}

module.exports = ck;

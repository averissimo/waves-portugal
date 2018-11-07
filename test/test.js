/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }] */
const shouldIgnored = require('should');
const {describe, it} = require('mocha');
const {IPMA} = require('..');

const ipma = new IPMA();

describe('#forecast()', () => {
  it('responds with at least 3 days worth of data for \'Cabo Espichel\' (local=42)', async () => {
    const forecast = await ipma.forecast(42);
    Object.values(forecast).length.should.be.aboveOrEqual(3);
    Object.values(forecast)[0].data.length.should.be.aboveOrEqual(24);
  }).timeout(15000);
});

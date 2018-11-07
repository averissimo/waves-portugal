/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }] */
const shouldIgnored = require('should');
const {describe, it} = require('mocha');
const {IPMA} = require('..');

const ipma = new IPMA();

describe('#forecast()', () => {
  it('responds with 3 days worth of data for \'Cabo Espichel\' (local=42)', async () => {
    const forecast = await ipma.forecast(42);
    Object.values(forecast).should.have.length(3);
    Object.values(forecast)[0].height.should.have.length(24);
    Object.values(forecast)[0].time.should.have.length(24);
  });
});

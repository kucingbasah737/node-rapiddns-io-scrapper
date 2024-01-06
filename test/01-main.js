/* global describe, it, before */

const should = require('should');

const rapiddns = require('../lib');

describe('#rapiddns', () => {
  describe('#query type: not specified', function () {
    let result;

    this.timeout(10000);

    before(async () => {
      result = await rapiddns('slashdot.org');
    });

    it('should return correct result', () => {
      Array.isArray(result).should.true('result should is an array');
      should.exists(result.find((item) => item.domain === 'www.slashdot.org'), '"www.slashdot.org" should exists');

      result.find((item) => item.domain === 'www.slashdot.org').type.should.equal('CNAME', 'www.slashdot.org\'s type should be "CNAME"');
      result.find((item) => item.domain === 'api.slashdot.org').address.should.equal('www.slashdot.org.', 'api.slashdot.org\'s address should be "www.slashdot.org."');
    });
  });

  describe('#query type: subdomain', function () {
    let result;

    this.timeout(10000);

    before(async () => {
      result = await rapiddns('slashdot.org', 'subdomain');
    });

    it('should return correct result', () => {
      Array.isArray(result).should.true('result should is an array');
      should.exists(result.find((item) => item.domain === 'www.slashdot.org'), '"www.slashdot.org" should exists');

      result.find((item) => item.domain === 'www.slashdot.org').type.should.equal('CNAME', 'www.slashdot.org\'s type should be "CNAME"');
      result.find((item) => item.domain === 'api.slashdot.org').address.should.equal('www.slashdot.org.', 'api.slashdot.org\'s address should be "www.slashdot.org."');
    });
  });

  describe('#query type: sameip', function () {
    let result;

    this.timeout(10000);

    before(async () => {
      result = await rapiddns('9.9.9.9', 'sameip');
    });

    it('should return correct result', () => {
      Array.isArray(result).should.true('result should is an array');
      should.exists(result.find((item) => item.domain === 'dns9.quad9.net'), '"dns9.quad9.net" should exists');

      result.find((item) => item.domain === 'dns9.quad9.net').type.should.equal('A', 'dns9.quad9.net\'s type should be "A"');
      result.find((item) => item.domain === 'dns9.quad9.net').address.should.equal('9.9.9.9', 'dns9.quad9.net\'s address should be "9.9.9.9"');
    });
  });
});

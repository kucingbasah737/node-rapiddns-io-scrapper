/* global describe, it, before */

const should = require('should');

const subdomain = require('../lib/subdomain');

describe('#subdomain', function () {
  let result;

  this.timeout(10000);

  before(async () => {
    result = await subdomain('slashdot.org');
  });

  it('should return correct result', () => {
    Array.isArray(result).should.true('result should is an array');
    should.exists(result.find((item) => item.domain === 'www.slashdot.org'), 'www.slashdot.org should exists');

    result.find((item) => item.domain === 'www.slashdot.org').type.should.equal('CNAME', 'www.slashdot.org\'s type should be "CNAME"');
    result.find((item) => item.domain === 'api.slashdot.org').address.should.equal('www.slashdot.org.', 'api.slashdot.org\'s address should be "www.slashdot.org."');
  });
});

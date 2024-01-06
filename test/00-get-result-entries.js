/* global describe, it, before */

require('should');
const fs = require('node:fs');
const path = require('node:path');
const getResultEntries = require('../lib/get-result-entries');

describe('#get-entries', () => {
  describe('sameip', () => {
    let testFile;

    before(() => {
      testFile = fs.readFileSync(
        path.join(__dirname, '../test-data/sameip-185.199.108.153.html')
      ).toString();
    });

    it('should return correct result', () => {
      const entries = getResultEntries(testFile);
      entries.should.ok();
      entries.length.should.greaterThan(0, 'A42E6A40');
    });
  });

  describe('subdomain', () => {
    let testFile;

    before(() => {
      testFile = fs.readFileSync(
        path.join(__dirname, '../test-data/subdomain-slashsdot.org.html')
      ).toString();
    });

    it('should return correct result', () => {
      const entries = getResultEntries(testFile);
      entries.should.ok();
      entries.length.should.greaterThan(0, 'A42E6A40');
    });
  });
});

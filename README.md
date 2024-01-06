# RapidDNS scrapper

[![Version npm](https://img.shields.io/npm/v/rapiddns-io-scrapper)](https://www.npmjs.com/package/rapiddns-io-scrapper)
[![node.js version](https://img.shields.io/node/v/rapiddns-io-scrapper)](https://www.npmjs.com/package/rapiddns-io-scrapper)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)
[![Unit test status](https://github.com/kucingbasah737/node-rapiddns-io-scrapper/actions/workflows/node.js.yml/badge.svg)](https://github.com/kucingbasah737/node-rapiddns-io-scrapper/actions/workflows/node.js.yml?query=branch%3Amain)

Node.js module to scrape and extract result from [rapiddns.io](https://rapiddns.io) (unofficial).

> RapidDNS is a dns query tool which make querying subdomains or sites of a same ip easy!

## Install
```shell
npm i rapiddns-io-scrapper
```

## API

**rapiddns(query, queryType)**

### query: string, mandatory
eg: 'google.com', '8.8.8.8'

If you put a domain/host name on query argument, it will return subdomains for that domain.
If you put an IP address (IPv4 or IPv6), it will return hostname with same ip address.

### queryType: string, optional
It is optional. If you want to specify it, can be one of: "subdomain" or "sameip".
You don't need to specify it. RapidDNS will detect suitable resolvers by your "query" value.

## Example
```javascript
const rapiddns = require('rapiddns-io-scrapper');

(async () => {
  const subdomains = await rapiddns('example.org');
  const sameips = await rapiddns('8.8.8.8');
})();
```

## Limitation
RapidDNS web will limit result to max 10000 items.

## License
Licensed under MIT license. See in [LICENSE](./LICENSE) file.

## Changelog
See in [CHANGELOG.md](./CHANGELOG.md) file.

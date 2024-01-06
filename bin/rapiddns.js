#! /usr/bin/env node

// console.log(process.argv);
const query = process.argv[2];

if (!query) {
  console.error('Usage: rapiddns <DOMAIN-OR-IP>');
  console.error('eg: rapiddns google.com');
  console.error('eg: rapiddns 8.8.8.8');
  process.exit(1);
}

const rapiddns = require('../lib');

(async () => {
  const result = new Set((await rapiddns(query)).map((item) => item.domain));

  result.forEach((item) => {
    console.log(item);
  });
})();

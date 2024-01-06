const { default: axios } = require('axios');
const userAgent = require('./user-agent');
const getResultEntries = require('./get-result-entries');

/**
 * @typedef ResultEntry
 * @type {object}
 * @property {string} domain
 * @property {string} address
 * @property {string} type
 * @property {string} date
 */
/**
 * Query to rapiddns.io
 *
 * @param {string} query - eg: '9.9.9.9', 'slashdot.org'
 * @param {('subdomain'|'sameip')} [queryType] -  optional, can be 'subdomain' or 'sameip'
 * @returns {Promise<ResultEntry[]>}
 */
module.exports = async (query, queryType) => {
  let baseUrl = 'https://rapiddns.io/s';
  if (queryType === 'subdomain') {
    baseUrl = 'https://rapiddns.io/subdomain';
  } else if (queryType === 'sameip') {
    baseUrl = 'https://rapiddns.io/sameip';
  }

  const endpoint = `${baseUrl}/${query}?full=1&down=1`;

  try {
    const response = await axios.get(endpoint, {
      timeout: 30 * 1000,
      headers: {
        'User-Agent': userAgent
      }
    });

    return getResultEntries(response.data)
      .map((entry) => {
        const [domain, address, type, date] = entry;
        return {
          domain,
          address,
          type,
          date
        };
      });
  } catch (e) {
    const newE = new Error('RAPIDDNS-IO-SCRAPPER: Exception');
    newE.code = 'RAPIDDNS-IO-SCRAPPER-EXCEPTION';
    newE.originalE = e;

    throw newE;
  }
};

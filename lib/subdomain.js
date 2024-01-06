const { default: axios } = require('axios');
const userAgent = require('./user-agent');
const getResultEntries = require('./get-result-entries');

/**
 * @typedef SubdomainEntry
 * @type {object}
 * @property {string} domain
 * @property {string} address
 * @property {string} type
 * @property {string} date
 */
/**
 * Get subdomains
 *
 * @param {string} query
 * @returns {Promise<SubdomainEntry[]>}
 */
module.exports = async (query) => {
  const endpoint = `https://rapiddns.io/subdomain/${query}?full=1&down=1`;

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

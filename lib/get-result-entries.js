/**
 * Extract result table entries
 * @param {string} html
 * @returns {string[][]}
 */
module.exports = (html) => {
  return html
    .match(/(?=(<tr>))(.+?)(?=<\/tr>)/gs)
    .filter((row) => row.indexOf('</td>') >= 0)
    .map((row) => row
      .match(/<td>.+?<\/td>/gs)
      .map((col) => col.replace(/<.+?>/g, '').trim())
    );
};

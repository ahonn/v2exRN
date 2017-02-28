const cheerio = require('cheerio');

export const get = (url, additionalHeader = null) => {
  return request('GET', url, additionalHeader);
};

function request(method, url, additionalHeader = null) {
  const headers = Object.assign({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'Connection': 'keep-alive',
  }, additionalHeader);

  const options = { method, headers };

  return fetch(url, options)
    .then(res => res.text())
    .then(body => cheerio.load(body));
}

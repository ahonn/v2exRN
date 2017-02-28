const cheerio = require('cheerio');
const utils = require('./utils');
const url = require('./url');

export const fetchAllTab = () => {
  return fetch(url.root)
    .then(res => {
      return res.text()
    }).then(body => {
      const $ = cheerio.load(body);
      let tabs = [];

      $('#Tabs a').each((i, el) => {
        const tabEl = $(el);

        const url = tabEl.attr('href');
        const name = tabEl.text();
        const id = url.split('=')[1];

        tabs.push({ id, url, name });
      });
      return tabs;
    });
};

export const fetchTopicsByTab = (tab) => {
  const tab_url = url.tab.replace('{{tab}}', tab);
  return fetch(tab_url)
    .then(res => {
      return res.text()
    }).then(body => {
      return utils.getTopicsFromHTML(body);
    });
};

export const fetchRecentTopics = (page = 1) => {
  const recent_url = url.recent.replace('{{paeg}}', page);

  return fetch(recent_url)
    .then(res => {
      return res.text();
    }).then(body => {
      return utils.getTopicsFromHTML(body);
    });
};

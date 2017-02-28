const url = require('./config/url');
const request = require('./utils/request');
const utils = require('./utils');

export const fetchAllTab = () => {
  const root_url = url.root;
  return request.get(root_url)
    .then($ => {
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
  return request.get(tab_url)
    .then($ => {
      return utils.getTopicsFromHTML($);
    });
};


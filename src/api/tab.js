const cheerio = require('cheerio');
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
}

export const fetchTopicsByTab = (tab) => {
  const tab_url = url.tab.replace('{{tab}}', tab);
  return fetch(tab_url)
    .then(res => {
      return res.text()
    }).then(body => {
      const $ = cheerio.load(body);
      let topics = [];

      $('.item').each((i, el) => {
        const topicEl = $(el);

        const titleEl = topicEl.find('.item_title a');
        const nodeEl = topicEl.find('.node');
        const info = topicEl.find('span.small.fade').text().split('•');

        const title = titleEl.text();
        const id = titleEl.attr('href').replace(/^\/t\/|#.*?$/g, '');
        const reply = topicEl.find('.count_livid').text() || 0;

        const author = {
          name: info[1].trim(),
          avatar: topicEl.find('.avatar').attr('src')
        };

        const node = {
          name: nodeEl.text(),
          id: nodeEl.attr('href').replace('/go/', '')
        }

        const lasttime = info[2] && info[2].trim() || '';

        topics.push({id, title, author, reply, node, author, lasttime});
      });
      return topics;
    });
}

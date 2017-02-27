const cheerio = require('cheerio');
const url = require('./url');

// TODO: some topic need login, return null without login.
export const fetchTopicById = (id) => {
  const topic_url = url.topic.replace('{{id}}', id);

  return fetch(topic_url)
    .then(res => {
      return res.text();
    }).then(body => {
      const $ = cheerio.load(body);

      const topicEl = $('#Main .box');
      const title = topicEl.find('.header h1').text();
      let content = topicEl.find('.topic_content').html() || '';
      // sometimes content is not html string, fix it.
      if (content && !(/^<div.*?/.test(content))) {
        content = `<p>${content}</p>`;
      }

      const author = {
        name: topicEl.find('.gray a').text(),
        avatar: topicEl.find('.avatar').attr('src') || '',
      }

      const nodeEl = $(topicEl.find('.header > a')[1]);
      const node = {
        name: nodeEl.text(),
        id: nodeEl.attr('href').replace('/go/', '')
      }

      const created = topicEl.find('.gray').text().split('·')[1].trim();

      return {
        id,
        title,
        content,
        author,
        node,
        created,
      }
    });
}

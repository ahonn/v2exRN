import * as request from '../utils/request';

export function getTopicsByTab(tab, params = {}) {
  if (tab === 'latest') return getLatestTopics();
  if (tab === 'hot') return getHotTopics();
  return request.get('/topics/show.json', {
    node_name: tab,
    ...params,
  });
}

export function getLatestTopics() {
  return request.get('/topics/latest.json'); 
}

export function getHotTopics() {
  return request.post('/topics/hot.json');
}

export function getTopicById(id) {
  return request.get('/topics/show.json', {
    id
  });
}

export function getTopicRepliesById(id) {
  return request.get('/replies/show.json', {
    topic_id: id
  });
}

export function getAllNodes() {
  return request.get('/nodes/all.json');
}
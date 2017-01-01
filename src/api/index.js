import * as request from '../utils/request';

function filterData(data) {
	return data;
}

export function getTopicsByTab(tab, params = {}) {
  if (tab === 'latest') return getLatestTopics();
  if (tab === 'hot') return getHotTopics();
  return request.get('/topics/show.json', {
    node_name: tab,
    ...params,
  }).then(filterData);
}

export function getLatestTopics() {
  return request.get('/topics/latest.json').then(filterData); 
}

export function getHotTopics() {
  return request.post('/topics/hot.json').then(filterData);
}
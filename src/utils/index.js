export const parseImageUrl = function (url) {
  if (/^\/\/.*/.test(url)) {
    return 'http:' + url;
  }
  return url;
}

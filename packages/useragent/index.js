/**
 * Applies a `User-Agent` header to each request
 * @param   {string} [useragent='go-fetch']
 * @returns {function(Client)}
 */
module.exports = useragent => client => client.before((req, next) => {
  req.headers['User-Agent'] = useragent || 'go-fetch';
  next(null, req);
});

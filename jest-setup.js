const fetchPolifill = require('whatwg-fetch');
module.exports = () => {
  global.testServer = require('./Server/server');
  global.fetch = fetchPolifill.fetch;
  global.Request = fetchPolifill.Request;
  global.Headers = fetchPolifill.Headers;
  global.Response = fetchPolifill.Response;
};

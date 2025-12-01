/* eslint-env node */
'use strict';

module.exports = function (app) {
  const httpProxy = require('http-proxy');
  const apiProxy = httpProxy.createProxyServer({});

  app.use('/api', function (req, res) {
    req.url = req.originalUrl.replace(/^\/api/, '');
    apiProxy.web(req, res, { target: 'http://localhost:8888' });
  });
};


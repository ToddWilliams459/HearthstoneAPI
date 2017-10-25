const https = require('https');

class ApiManager {
  constructor(baseUrl, apiUri, key) {
    this.baseUrl = baseUrl;
    this.apiUri = apiUri;
    this.key = key;
  }

  // Sending a get request.
  // param uri target endpoint.
  // param success sucess callback
  // param failure failure callback
  get(uri) {
    return new Promise((resolve, reject) => {
      const options = {
        host: this.baseUrl,
        protocol: 'https:',
        path: this.apiUri + uri,
        method: 'GET',
      };

      const req = https.request(options, (res) => {
        res.setEncoding('utf8');

        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(data));
        });

        res.on('error', (e) => {
          reject(e);
        });
      });

      req.end();
    });
  }
}

module.exports = {
  ApiManager,
};


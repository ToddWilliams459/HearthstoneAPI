const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../static/client.html`);
const index2 = fs.readFileSync(`${__dirname}/../static/client2.html`);
const css = fs.readFileSync(`${__dirname}/../static/css/style.css`);
const bootStrap = fs.readFileSync(`${__dirname}/../static/css/bootstrap.css`);


const getIndex = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(index);
	response.end();
};

const getIndex2 = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(index2);
	response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getBootstrap = (request, response) => {
   response.writeHead(200, {'Content-Type': 'text/css'});
   response.write(bootStrap);
   response.end();
};


module.exports = {
  getIndex,
  getIndex2,
  getCSS,
  getBootstrap,
};
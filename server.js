import http from 'http';
import app from './lib/app.js';

const server = http.createServer(app);

server.listen(7890);

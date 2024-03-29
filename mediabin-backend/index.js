const app = require('./app');
const http = require('http');
const logger = require('./utils/logger');
require('dotenv').config();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`);
});

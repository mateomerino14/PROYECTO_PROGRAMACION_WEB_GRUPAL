import spdy from 'spdy';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config/env.config.js'; 
import { connectDatabase } from './config/database.config.js';
import app from './config/server.config.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CERT_DIR = `${__dirname}/../cert`;

const server = spdy.createServer({
    key: fs.readFileSync(`${CERT_DIR}/server.key`),
    cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
  },
  app
);

connectDatabase();

server.listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
  console.log('SSL Enabled');
});

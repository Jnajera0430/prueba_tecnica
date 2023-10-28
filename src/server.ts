import express from 'express';
const server = express();
//config
server.use(express.json());

export default server
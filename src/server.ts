import express from 'express';
import cors from 'cors'
const server = express();
//config
server.use(express.json());
server.use(cors({
    origin: "*"
}))

export default server
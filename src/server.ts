import express from 'express';
import cors from 'cors'
import paginate from 'express-paginate'
const server = express();
//config
server.use(express.json());
server.use(paginate.middleware(10, 50));
server.use(cors({
    origin: "*"
}))

export default server
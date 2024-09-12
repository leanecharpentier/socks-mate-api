import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

import usersRouter from "./users/routes.js"


export class Server {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
          extended: false
        }));

        this.app.get('/', (req, res) => {
            res.send('Hello World')
        })
        this.app.use('/users', usersRouter);

        this.app.use(function (req, res, next) {
            res.send(404)
        });

          
        this.server = createServer(this.app);
    }

    start() {
        this.server.listen(process.env.PORT, async () => {
            console.info(`Server is running on port ${process.env.PORT}`);
        });
    }

    getApp() {
        return this.app
    }
}

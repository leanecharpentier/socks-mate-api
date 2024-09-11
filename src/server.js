import express from 'express';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';


export class Server {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
          extended: false
        }));

        this.app.use(function (req, res, next) {
            res.send(404)
        });

        this.app.get("/", (req, res) => {
            res.status(200).json({message: "hello world !"})
        })
          
        this.server = createServer(this.app);
    }

    start() {
        this.server.listen("3000", async () => {
            console.info(`Server is running on port 3000`);
        });
    }
}

// import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import cors from 'cors';
// import {UserRouter} from "./routes/user.routes"
//
// dotenv.config();
//
// const app: Express = express();
// const port = process.env.PORT || 3000;
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors())
//
// app.use('/user', UserRouter)
//
// app.get("/", (req: Request, res: Response) => {
//     res.send("Express + TypeScript Server");
// });
//
//
// app.listen(port, () => {
//     console.log(`[server]: Server is running at http://localhost:${port}`);
// });

import express, {Application, Request, Response} from "express"
import cosr from "cors"
import {HttpResponse} from "./domain/response"
import {Code} from "./enum/code.enum"
import {Status} from "./enum/status.enum"
import userRoutes from "./routes/user.routes"

export class App {
    private readonly app: Application
    private readonly APPLICATION_RUNNING = "Application running"
    private readonly ROUTE_NOT_FOUND = "Route not found"

    constructor(private readonly port: (string | number) = process.env.PORT || 3000) {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    listen(): void {
        this.app.listen(this.port)
        console.info(`${this.APPLICATION_RUNNING} on port ${this.port}`)
    }

    private middlewares() {
        this.app.use(cosr())
        this.app.use(express.json())
    }

    private routes(): void {
        this.app.use('/user', userRoutes)
        this.app.get('/', (_, res: Response) => {
            res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, this.APPLICATION_RUNNING))
        })
        this.app.all('*', (_, res: Response) => {
            res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND))
        })
    }
}

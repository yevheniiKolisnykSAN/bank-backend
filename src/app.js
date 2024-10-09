"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const response_1 = require("./domain/response");
const code_enum_1 = require("./enum/code.enum");
const status_enum_1 = require("./enum/status.enum");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
class App {
    constructor(port = process.env.PORT || 3000) {
        this.port = port;
        this.APPLICATION_RUNNING = "Application running";
        this.ROUTE_NOT_FOUND = "Route not found";
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} on port ${this.port}`);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/user', user_routes_1.default);
        this.app.get('/', (_, res) => {
            res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, this.APPLICATION_RUNNING));
        });
        this.app.all('*', (_, res) => {
            res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, this.ROUTE_NOT_FOUND));
        });
    }
}
exports.App = App;

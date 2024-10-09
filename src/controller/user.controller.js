"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const mysql_config_1 = require("../config/mysql.config");
const user_query_1 = require("../query/user.query");
const code_enum_1 = require("../enum/code.enum");
const response_1 = require("../domain/response");
const status_enum_1 = require("../enum/status.enum");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(user_query_1.QUERY.SELECT_USER);
        if (result[0].length > 0) {
            res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'User fetched successfully', result[0]));
        }
        else {
            res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'User not found'));
        }
    }
    catch (e) {
        console.error(e);
        res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body;
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(user_query_1.QUERY.CREATE_USER, [user.firstName, user.lastName, user.email, user.password]);
        user.id = result[0].insertId.toString();
        res.status(code_enum_1.Code.CREATED).send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'User created successfully', user));
    }
    catch (e) {
        console.error(e);
        res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.createUser = createUser;

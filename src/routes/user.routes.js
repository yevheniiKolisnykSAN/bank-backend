"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.route('/')
    .get(user_controller_1.getUser)
    .post(user_controller_1.createUser);
exports.default = userRoutes;

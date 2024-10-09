"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_USER: `SELECT * FROM users WHERE email = ?`,
    CREATE_USER: `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`
};

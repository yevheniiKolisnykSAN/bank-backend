export const QUERY = {
    SELECT_USER: `SELECT * FROM users WHERE email = ?`,
    CREATE_USER: `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`
}

import {Request, Response} from 'express'
import {connection} from "../config/mysql.config"
import {User} from "../interface/user"
import {QUERY} from "../query/user.query"
import {Code} from "../enum/code.enum"
import {HttpResponse} from "../domain/response"
import {Status} from "../enum/status.enum"
import {FieldPacket, ResultSetHeader, RowDataPacket} from "mysql2"

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_USER);

        if ((result[0] as ResultSet[]).length > 0) {
            res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User fetched successfully', result[0]));
        } else {
            res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
        }
    } catch (e: unknown) {
        console.error(e);
        res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    let user: User = req.body
    try {
        const pool = await connection()
        const result: ResultSet = await pool.query(QUERY.CREATE_USER, [user.firstName, user.lastName, user.email, user.password])
        user.id = (result[0] as ResultSetHeader).insertId.toString()
        res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, 'User created successfully', user))
    } catch (e: unknown) {
        console.error(e)
        res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'))
    }
}

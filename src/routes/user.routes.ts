import {Router} from "express"
import {createUser, getUser} from "../controller/user.controller"


const userRoutes = Router()
userRoutes.route('/')
    .get(getUser)
    .post(createUser)


export default userRoutes

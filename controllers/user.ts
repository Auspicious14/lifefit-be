const UserSchema = require('../models/user')
import { Request, Response } from "express"

const createUser = (req: Request, res: Response) => {
    const user = new UserSchema(req.body
    )
    user.save()
    .then((result: any) => {res.send(result); console.log(result)})
        .catch((err: any) => console.log(err))

}

const getUser = (req: Request, res: Response) => {
    UserSchema.find().sort({createdAt: -1})
    .then((result: any) => res.send(result))
    .catch((err: any) => console.log(err))
}

module.exports = {
    createUser,
    getUser
}
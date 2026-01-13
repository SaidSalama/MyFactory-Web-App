import type { Request, Response } from "express";
import UsersRepo from "../repositories/users_repo";

class UsersController {
    public index = async (req: Request, res: Response) => {
        //get the result oh the query
        const reslults = await new UsersRepo().selectAll();

        //check if there is an error in query
        if (reslults instanceof Error) {
            res.status(400).json({
                status: 400,
                message:
                    process.env.NODE_ENV === "production" ? "ERROR detected" : reslults.message,
            });
            return;
        }
        //send a response with request status and json

        res.status(200).json({ status: 200, message: "users", data: reslults });
    };

    public selectOne = async (req: Request, res: Response) => {
        console.log(req.params);
        //get the result oh the query
        const reslults = await new UsersRepo().selectOne(req.params);

        //check if there is an error in query
        if (reslults instanceof Error) {
            res.status(400).json({
                status: 400,
                message:
                    process.env.NODE_ENV === "production" ? "ERROR" : reslults.message,
            });
            return;
        }
        //send a response with request status and json

        res.status(200).json({ status: 200, message: "user", data: reslults });
    };

    public insertUser = async (req: Request, res: Response) => {
        console.log(req.params);
        //get the result oh the query
        const reslults = await new UsersRepo().inserUser(req.body);

        //check if there is an error in query
        if (reslults instanceof Error) {
            res.status(400).json({
                status: 400,
                message:
                    process.env.NODE_ENV === "production" ? "ERROR" : reslults.message,
            });
            return;
        }
        //send a response with request status and json

        res.status(200).json({ status: 201, message: "user inserted", data: reslults });
    };

    public deleteUser = async (req: Request, res: Response) => {
        console.log(req.params);
        //get the result oh the query
        const reslults = await new UsersRepo().deleteUser(req.body);

        //check if there is an error in query
        if (reslults instanceof Error) {
            res.status(400).json({
                status: 400,
                message:
                    process.env.NODE_ENV === "production" ? "ERROR" : reslults.message,
            });
            return;
        }
        //send a response with request status and json

        res.status(200).json({ status: 201, message: "user deleted", data: reslults });
    };
}
export default UsersController;

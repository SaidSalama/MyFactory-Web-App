import type { Request, Response } from "express";
import PriorityRepo from "../repositories/priority_repo";

class PriorityController {
    public index = async (req: Request, res: Response) => {
        //get the result oh the query
        const reslults = await new PriorityRepo().selectAll();

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

        res.status(200).json({ status: 200, message: "Priority", data: reslults });
    };

    public selectOne = async (req: Request, res: Response) => {
        console.log(req.params);
        //get the result oh the query
        const reslults = await new PriorityRepo().selectOne(req.params);

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

        res.status(200).json({ status: 200, message: "priority", data: reslults });
    };
}
export default PriorityController;

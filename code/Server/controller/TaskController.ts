import type { Request, Response } from "express";
import TaskRepo from "../repositories/task_repo";

class TaskController {
	public index = async (_req: Request, res: Response) => {
		//get the result oh the query
		const reslults = await new TaskRepo().selectAll();

		//check if there is an error in query
		if (reslults instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production"
						? "ERROR detected"
						: reslults.message,
			});
			return;
		}
		//send a response with request status and json

		res.status(200).json({ status: 200, message: "Tasks", data: reslults });
	};

	public selectOne = async (req: Request, res: Response) => {
		console.log(req.params);
		//get the result oh the query
		const reslults = await new TaskRepo().selectOne(req.params);

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

		res.status(200).json({ status: 200, message: "Tasks", data: reslults });
	};

	public insert = async (req: Request, res: Response) => {
		console.log(req.body);
		//get the result oh the query
		const reslults = await new TaskRepo().insertTransaction(req.body);

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

		res
			.status(201)
			.json({ status: 201, message: "Task created", data: reslults });
	};
	public delete = async (req: Request, res: Response) => {
		console.log(req.body);
		//get the result oh the query
		const reslults = await new TaskRepo().deleteTransaction(req.body);

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

		res
			.status(201)
			.json({ status: 201, message: "Task deleted", data: reslults }); //201 means create succedded
	};

	public updatestatus = async (req: Request, res: Response) => {
		console.log(req.body);
		//get the result oh the query
		const reslults = await new TaskRepo().updatestatus(req.body);

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

		res
			.status(201)
			.json({ status: 201, message: "Task updated", data: reslults }); //201 means create succedded
	};
}
export default TaskController;

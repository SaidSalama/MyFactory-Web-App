import type { Request, Response } from "express";
import TaskRepo from "../repositories/task_repo";
<<<<<<< HEAD
import { BaseController } from "./BaseController";
import { n8nService } from "../services/n8n_service";
import type { Task } from "../../models/task";

class TaskController extends BaseController {
	
=======

class TaskController {
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
		await n8nService.sendToN8n('task_created', reslults); //send the created task to n8n workflow
		this.broadcastUpdate('task', 'CREATE', reslults);
=======
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
		await n8nService.sendToN8n('task_approved', reslults); //send the deleted/approved task to n8n workflow
		this.broadcastUpdate('task', 'DELETE', reslults);
=======
>>>>>>> 6d15baa (adding all previous work)
		//send a response with request status and json

		res
			.status(201)
			.json({ status: 201, message: "Task deleted", data: reslults }); //201 means create succedded
	};

	public updatestatus = async (req: Request, res: Response) => {
		console.log(req.body);
		//get the result oh the query
<<<<<<< HEAD
		const reslults = await new TaskRepo().updatestatus(req.body) as Task;
		
=======
		const reslults = await new TaskRepo().updatestatus(req.body);

>>>>>>> 6d15baa (adding all previous work)
		//check if there is an error in query
		if (reslults instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "ERROR" : reslults.message,
			});
			return;
		}
<<<<<<< HEAD
		//only sends to n8n when task update maks the task done
		if (reslults.status.value === "Done") {
			await n8nService.sendToN8n('task_updated', reslults); //send the updated/done task to n8n workflow
		}
		
		this.broadcastUpdate('task', 'UPDATE', reslults);
=======
>>>>>>> 6d15baa (adding all previous work)
		//send a response with request status and json

		res
			.status(201)
			.json({ status: 201, message: "Task updated", data: reslults }); //201 means create succedded
	};
}
export default TaskController;

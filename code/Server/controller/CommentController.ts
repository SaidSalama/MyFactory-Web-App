import type { Request, Response } from "express";
import CommentRepo from "../repositories/commentRepo";

class CommentController {
	public index = async (req: Request, res: Response) => {
		//get the result oh the query
		const reslults = await new CommentRepo().selectAll();

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

		res.status(200).json({ status: 200, message: "comment", data: reslults });
	};

	public selectOne = async (req: Request, res: Response) => {
		console.log(req.params);
		//get the result oh the query
		const reslults = await new CommentRepo().selectOne(req.params);

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

		res.status(200).json({ status: 200, message: "Comment", data: reslults });
	};

	public GetTaskComment = async (req: Request, res: Response) => {
		console.log(req.body);
		//get the result oh the query
		const reslults = await new CommentRepo().GetTaskComment(req.body);

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
			.status(200)
			.json({ status: 200, message: "Comment of tasks", data: reslults });
	};

	public CreateTaskComment = async (req: Request, res: Response) => {
		console.log(req.body);
		//get the result oh the query
		const reslults = await new CommentRepo().CreateTaskComment(req.body);

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
			.status(200)
			.json({
				status: 200,
				message: "Comment of task created",
				data: reslults,
			});
	};
}
export default CommentController;

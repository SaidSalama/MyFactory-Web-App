import type { Request, Response } from "express";
import DemandRepo from "../repositories/demandRepo";

class DemandController {
	public index = async (req: Request, res: Response) => {
		//get the result oh the query
		const reslults = await new DemandRepo().selectAll();

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

		res.status(200).json({ status: 200, message: "demand", data: reslults });
	};

	public selectOne = async (req: Request, res: Response) => {
		console.log(req.params);
		//get the result oh the query
		const reslults = await new DemandRepo().selectOne(req.params);

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

		res.status(200).json({ status: 200, message: "demand", data: reslults });
	};

	public markDemand_completed = async (req: Request, res: Response) => {
		const reslults = await new DemandRepo().markDemand_completed(req.params);

		if (reslults instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "ERROR" : reslults.message,
			});
			return;
		}
		res
			.status(201)
			.json({ status: 200, message: "demand updated", data: reslults });
	};

	public inset_Demand = async (req: Request, res: Response) => {
		const reslults = await new DemandRepo().insert_Deamand(req.body);

		if (reslults instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "ERROR" : reslults.message,
			});
			return;
		}
		res
			.status(200)
			.json({ status: 200, message: "demand inserted", data: reslults });
	};

	public delete_Demand = async (req: Request, res: Response) => {
		const reslults = await new DemandRepo().delete_Demand(req.body);

		if (reslults instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "ERROR" : reslults.message,
			});
			return;
		}
		res
			.status(200)
			.json({ status: 200, message: "demand deleted", data: reslults });
	};
}
export default DemandController;

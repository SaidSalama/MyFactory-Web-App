import type { Request, Response } from "express";
import DemandRepo from "../repositories/demandRepo";
<<<<<<< HEAD
import { BaseController } from "./BaseController";
import { n8nService } from "../services/n8n_service";

class DemandController extends BaseController{
=======

class DemandController {
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
		await n8nService.sendToN8n('demand_completed', reslults);
		this.broadcastUpdate('demand', 'UPDATE', reslults);
=======
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
		await n8nService.sendToN8n('demand_created', reslults);
		this.broadcastUpdate('demand', 'CREATE', reslults);
=======
>>>>>>> 6d15baa (adding all previous work)
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
<<<<<<< HEAD
		await n8nService.sendToN8n('demand_deleted', reslults);
		this.broadcastUpdate('demand', 'DELETE', reslults);
=======
>>>>>>> 6d15baa (adding all previous work)
		res
			.status(200)
			.json({ status: 200, message: "demand deleted", data: reslults });
	};
}
export default DemandController;

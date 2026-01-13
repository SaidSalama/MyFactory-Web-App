import type { Request, Response } from "express";
import MachineRepo from "../repositories/machine_repo";

class MachineController {
	public index = async (req: Request, res: Response) => {
		//get the result oh the query
		const reslults = await new MachineRepo().selectAll();

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

		res.status(200).json({ status: 200, message: "Machines", data: reslults });
	};

	public selectOne = async (req: Request, res: Response) => {
		console.log(req.params);
		//get the result oh the query
		const reslults = await new MachineRepo().selectOne(req.params);

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

		res.status(200).json({ status: 200, message: "Machines", data: reslults });
	};

	public createMachine = async (req: Request, res: Response) => {
		//get the result oh the query
		const reslults = await new MachineRepo().createMachine(req.body);

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
			.json({ status: 200, message: "Machine created", data: reslults });
	};
	public updateMachine_status = async (req: Request, res: Response) => {
		console.log(req.params);
		//get the result oh the query
		const reslults = await new MachineRepo().updateMachine_status(req.body);

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

		res.status(200).json({ status: 200, message: "Machines", data: reslults });
	};

	public updateMachine_efficency = async (req: Request, res: Response) => {
		//console.log(req.params);
		//get the result oh the query
		const reslults = await new MachineRepo().updateMachine_efficency(req.body);

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

		res.status(200).json({ status: 200, message: "Machines", data: reslults });
	};
	public updateMachine_last_maintenance = async (
		req: Request,
		res: Response,
	) => {
		//console.log(req.params);
		//get the result oh the query
		const reslults = await new MachineRepo().updateMachine_last_maintenance(
			req.body,
		);

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

		res.status(200).json({ status: 200, message: "Machines", data: reslults });
	};

	public deleteMachine = async (req: Request, res: Response) => {
		//console.log(req.params);
		//get the result oh the query
		const reslults = await new MachineRepo().deleteMachine(req.body);

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
			.json({ status: 200, message: "Machine deleted", data: reslults });
	};
}
export default MachineController;

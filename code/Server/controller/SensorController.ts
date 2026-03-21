import type { Request, Response } from "express";
import SensorRepo from "../repositories/sensor_repo";
<<<<<<< HEAD
import { BaseController } from "./BaseController";

class SensorController extends  BaseController {
=======

class SensorController {
>>>>>>> 6d15baa (adding all previous work)
	public index = async (_req: Request, res: Response) => {
		const result = await new SensorRepo().SelectAll();
		if (result instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : result.message,
			});
			return;
		}
		res
			.status(200)
			.json({ status: 200, message: "Sensors found", data: result });
	};
	public selectOne = async (req: Request, res: Response) => {
		console.log(req.params);
		//get the result oh the query
		const reslults = await new SensorRepo().selectOne(req.params);

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

		res.status(200).json({ status: 200, message: "Sensors", data: reslults });
	};

	public updateValue = async (req: Request, res: Response) => {
		console.log(req.params);
		//get the result oh the query
		const reslults = await new SensorRepo().updateValue(req.body);

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
			.json({ status: 200, message: "Sensors value updated", data: reslults });
	};

	public create = async (req: Request, res: Response) => {
<<<<<<< HEAD
		//console.log(req.params);
=======
		console.log(req.params);
>>>>>>> 6d15baa (adding all previous work)
		//get the result oh the query
		const reslults = await new SensorRepo().create(req.body);

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
		//send to to the clients that a sensor has been created
		this.broadcastUpdate('sensor', 'CREATE', reslults);
		//send a response with request status and json
=======
		//send a response with request status and json

>>>>>>> 6d15baa (adding all previous work)
		res
			.status(200)
			.json({ status: 200, message: "Sensors created", data: reslults });
	};

	public delete = async (req: Request, res: Response) => {
		//console.log(req.params);
		//get the result oh the query
		const reslults = await new SensorRepo().delete(req.body);

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
		// After successful deletiion, broadcast update
		this.broadcastUpdate('sensor', 'DELETE', reslults);

=======
>>>>>>> 6d15baa (adding all previous work)
		//send a response with request status and json

		res
			.status(200)
			.json({ status: 200, message: "Sensors deleted", data: reslults });
	};
}
export default SensorController;

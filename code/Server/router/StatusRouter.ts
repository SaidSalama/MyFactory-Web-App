import express from "express";
import StatusController from "../controller/StatusController";

class StatusRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Status", new StatusController().index);
		//create a get router with router variables
		this.router.get("/Status/:status_id", new StatusController().selectOne);

		return this.router;
	};
}
export default StatusRouter;
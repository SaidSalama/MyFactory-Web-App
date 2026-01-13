import express from "express";
import PriorityController from "../controller/PriorityController";

class PriorityRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Priority", new PriorityController().index);
		//create a get router with router variables
		this.router.get("/Priority/:priority_id", new PriorityController().selectOne);

		return this.router;
	};
}
export default PriorityRouter;
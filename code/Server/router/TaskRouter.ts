import express from "express";
import TaskController from "../controller/TaskController";
import { authMiddleware } from "../middlewares/auth_middleware";
import { roleMiddleware } from "../middlewares/role_middlware";

class TaskRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Task", new TaskController().index);
		//create a get router with router variables
		this.router.get("/Task/:task_id", new TaskController().selectOne);
		//protect the route of creating tasks so it can't craete task without token of user
		this.router.post(
			"/Task",
			authMiddleware,
			roleMiddleware([1]), //only engineers can create tasks
			new TaskController().insert,
		);
		this.router.put("/Task", new TaskController().updatestatus);
		this.router.delete("/Task", new TaskController().delete);

		return this.router;
	};
}
export default TaskRouter;

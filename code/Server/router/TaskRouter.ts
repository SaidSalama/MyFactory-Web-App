import express from "express";
import TaskController from "../controller/TaskController";

class TaskRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Task", new TaskController().index);
		//create a get router with router variables
		this.router.get("/Task/:task_id", new TaskController().selectOne);

		this.router.post("/Task", new TaskController().insert);
		this.router.put("/Task", new TaskController().updatestatus);
		this.router.delete("/Task", new TaskController().delete);

		return this.router;
	};
}
export default TaskRouter;

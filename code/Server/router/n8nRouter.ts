import express from "express";
import { n8nController } from "../controller/n8nController";

class n8nRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a route for login
		this.router.post("/n8n", n8nController.readFromN8n);

		return this.router;
	};
}
export default n8nRouter;

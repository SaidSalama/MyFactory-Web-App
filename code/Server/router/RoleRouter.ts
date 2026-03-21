import express from "express";
import RoleController from "../controller/RoleController";

class RoleRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Role", new RoleController().index);
		//create a get router with router variables
		this.router.get("/Role/:role_id", new RoleController().selectOne);

		return this.router;
	};
}
export default RoleRouter;

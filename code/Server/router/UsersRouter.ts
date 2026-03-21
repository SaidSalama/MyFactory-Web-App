import express from "express";
import UsersController from "../controller/UsersController";

class UsersRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Users", new UsersController().index);
		//create a get router with router variables
		this.router.get("/Users/:user_id", new UsersController().selectOne);
		//insert a new user 
		this.router.post("/Users", new UsersController().insertUser);
		//delete a user
		this.router.delete("/Users", new UsersController().deleteUser);

		return this.router;
	};
}
export default UsersRouter;
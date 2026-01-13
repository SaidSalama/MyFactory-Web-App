import express from "express";
import CommentController from "../controller/CommentController";

class CommentRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Comment", new CommentController().index);
		//create a get router with router variables
		this.router.get("/Comment/:comment_id", new CommentController().selectOne);
		this.router.get("/TaskComment", new CommentController().GetTaskComment);
		this.router.post("/TaskComment", new CommentController().CreateTaskComment);

		return this.router;
	};
}
export default CommentRouter;

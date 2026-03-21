import express from "express";
import AuthController from "../controller/AuthController";

class AuthRouter {
    private router = express.Router();

    public getRoutes = () => {
     
        //create a route for login
        this.router.post("/Login", new AuthController().login);
      

        return this.router;
    };
}
export default AuthRouter;
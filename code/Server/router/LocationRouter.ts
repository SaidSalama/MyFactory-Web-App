import express from "express";
import LocationController from "../controller/LocationController";

class LocationRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Location", new LocationController().index);
		//create a get router with router variables
		this.router.get("/Location/:location_id", new LocationController().selectOne);

		return this.router;
	};
}
export default  LocationRouter ;
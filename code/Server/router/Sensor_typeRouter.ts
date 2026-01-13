import express from "express";
import Sensor_typeController from "../controller/Sensor_typeController";

class Sensor_typeRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/Sensor_type", new Sensor_typeController().index);
		//create a get router with router variables
		this.router.get("/Sensor_type/:sensortype_id", new Sensor_typeController().selectOne);

		return this.router;
	};
}
export default  Sensor_typeRouter ;

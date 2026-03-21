import express from "express";
import SensorController from "../controller/SensorController";

class SensorRouter {
	private router = express.Router();
	public getRoutes = () => {
		this.router.get("/Sensor", new SensorController().index);
		this.router.delete("/Sensor", new SensorController().delete);
		this.router.put("/Sensor", new SensorController().updateValue);
		this.router.post("/Sensor", new SensorController().create);
		this.router.get("/Sensor/:sensor_id", new SensorController().selectOne);
		return this.router;
	};
}
export default SensorRouter;
